import { useEffect, useState, useMemo } from "react";
import HealthStatsCard from "./HealthStatsCard";
import ActivityCard from "./ActivityCard";
import FatGraph from "./FatGraph";
import Loading from "./Loader";

// Function to simulate live data changes
const generateLiveData = (prevData) => {
  return prevData?.formattedData?.map(item => ({
    ...item,
    step_count: item.step_count + Math.floor(Math.random() * 200 - 100),
    glucose_level: item.glucose_level + Math.floor(Math.random() * 5 - 2),
    body_fat_in_percent: item.body_fat_in_percent + Math.random() * 0.5 - 0.25,
    weight: item.weight + Math.random() * 0.5 - 0.25,
    heart_rate: item.heart_rate + Math.floor(Math.random() * 3 - 1)
  })) || [];
};

const Dashboard = () => {
  const [fitnessData, setFitnessData] = useState({
    formattedData: [
      { date: "Mon", step_count: 4500, glucose_level: 95, body_fat_in_percent: 18, weight: 70, height_in_cms: 175, blood_pressure: [120, 80], heart_rate: 72 },
      { date: "Tue", step_count: 6700, glucose_level: 110, body_fat_in_percent: 20, weight: 72, height_in_cms: 175, blood_pressure: [130, 85], heart_rate: 76 },
      { date: "Wed", step_count: 5000, glucose_level: 105, body_fat_in_percent: 19, weight: 71, height_in_cms: 175, blood_pressure: [125, 82], heart_rate: 74 },
    ]
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Set up interval for live data updates
    const interval = setInterval(() => {
      setFitnessData(prevData => ({
        formattedData: generateLiveData(prevData)
      }));
    }, 10000); // Update every 10 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // UseMemo to optimize calculations
  const { maxWeight, maxHeight, maxBPArray, StepCount, heartrate, fatData, activityData } = useMemo(() => {
    const formattedData = fitnessData?.formattedData || [];
    const latestData = formattedData[formattedData.length - 1] || {};

    const maxWeight = latestData.weight || 0;
    const maxHeight = latestData.height_in_cms || 0;
    const maxBPArray = latestData.blood_pressure || [0, 0];
    const StepCount = latestData.step_count || 0;
    const heartrate = latestData.heart_rate || 0;

    const fatData = formattedData.map(item => ({
      date: item.date,
      body_fat_in_percent: item.body_fat_in_percent
    }));
    
    const activityData = formattedData.map(item => ({
        date: item.date,
        step_count: item.step_count,
        glucose_level: item.glucose_level
    }));

    return { maxWeight, maxHeight, maxBPArray, StepCount, heartrate, fatData, activityData };
  }, [fitnessData]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-[#13131a] p-4 text-white min-h-screen">
          <div className="mb-6">
            <HealthStatsCard
              weight={maxWeight}
              height={maxHeight}
              BP={maxBPArray}
              step={StepCount}
              heart={heartrate}
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <ActivityCard result={activityData} glucose={activityData} />
            <FatGraph fat={fatData} />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
