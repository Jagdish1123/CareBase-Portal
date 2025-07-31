import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconAlertCircle,
  IconCircleDashedCheck,
  IconFolder,
  IconHourglassHigh,
  IconUserScan,
} from "@tabler/icons-react";
import { usePrivy } from "@privy-io/react-auth";
import MetricsCard from "./MetricsCard";
import { useStateContext } from "../context";

const processKanbanRecords = (records) => {
  let aiPersonalizedTreatment = 0;
  let totalScreenings = 0;
  let completedScreenings = 0;
  let pendingScreenings = 0;
  let overdueScreenings = 0;

  records.forEach((record) => {
    if (record.kanbanRecords) {
      try {
        const kanban = JSON.parse(record.kanbanRecords);
        const hasAITreatment = kanban.columns.some(
          (column) => column.title === "AI Personalized Treatment"
        );
        if (hasAITreatment) {
          aiPersonalizedTreatment += 1;
        }

        const tasks = kanban.tasks || [];
        totalScreenings += tasks.length;
        completedScreenings += tasks.filter((task) => task.columnId === "done").length;
        pendingScreenings += tasks.filter((task) => task.columnId === "doing").length;
        overdueScreenings += tasks.filter((task) => task.columnId === "overdue").length;
      } catch (error) {
        console.error("Failed to parse kanbanRecords:", error);
      }
    }
  });

  return {
    totalFolders: records.length,
    aiPersonalizedTreatment,
    totalScreenings,
    completedScreenings,
    pendingScreenings,
    overdueScreenings,
  };
};

const DisplayInfo = () => {
  const navigate = useNavigate();
  const { user } = usePrivy();
  const { records, fetchUserByEmail } = useStateContext();
  const [metrics, setMetrics] = useState({
    totalFolders: 0,
    aiPersonalizedTreatment: 0,
    totalScreenings: 0,
    completedScreenings: 0,
    pendingScreenings: 0,
    overdueScreenings: 0,
  });

  useEffect(() => {
    if (user?.email?.address) {
      fetchUserByEmail(user.email.address).catch((e) => {
        console.error("Failed to fetch user by email:", e);
      });
    }
  }, [user, fetchUserByEmail]);

  useEffect(() => {
    if (records) {
      setMetrics(processKanbanRecords(records));
    }
  }, [records]);

  const metricsData = useMemo(() => ([
    {
      title: "Specialist Appointments Pending",
      subtitle: "View",
      value: metrics.pendingScreenings,
      icon: IconHourglassHigh,
      onClick: () => navigate("/appointments/pending"),
    },
    {
      title: "Treatment Progress Update",
      subtitle: "View",
      value: `${metrics.completedScreenings} of ${metrics.totalScreenings}`,
      icon: IconCircleDashedCheck,
      onClick: () => navigate("/treatment/progress"),
    },
    {
      title: "Total Folders",
      subtitle: "View",
      value: metrics.totalFolders,
      icon: IconFolder,
      onClick: () => navigate("/folders"),
    },
    {
      title: "Total Screenings",
      subtitle: "View",
      value: metrics.totalScreenings,
      icon: IconUserScan,
      onClick: () => navigate("/screenings"),
    },
    {
      title: "Completed Screenings",
      subtitle: "View",
      value: metrics.completedScreenings,
      icon: IconCircleDashedCheck,
      onClick: () => navigate("/screenings/completed"),
    },
    {
      title: "Pending Screenings",
      subtitle: "View",
      value: metrics.pendingScreenings,
      icon: IconHourglassHigh,
      onClick: () => navigate("/screenings/pending"),
    },
    {
      title: "Overdue Screenings",
      subtitle: "View",
      value: metrics.overdueScreenings,
      icon: IconAlertCircle,
      onClick: () => navigate("/screenings/overdue"),
    },
  ]), [metrics, navigate]);

  return (
    <div className="flex flex-wrap gap-[26px]">
      <div className="mt-7 grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
        {metricsData.slice(0, 2).map((metric) => (
          <MetricsCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="mt-[9px] grid w-full gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {metricsData.slice(2).map((metric) => (
          <MetricsCard key={metric.title} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default DisplayInfo;