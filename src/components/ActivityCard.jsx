import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const ActivityCard = ({ result, glucose }) => {
  // Data validation for 'result' and 'glucose' with a default empty array
  const validResult = Array.isArray(result) ? result : [];
  const validGlucose = Array.isArray(glucose) ? glucose : [];

  return (
    <div className="rounded-2xl border-2 border-gray-700 bg-[#1c1c24] p-6 shadow-xl">
      <h2 className="mb-6 text-3xl font-extrabold text-white">Daily Activity</h2>
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Step Count Chart */}
        <div className="flex-1 rounded-2xl bg-[#13131a] p-6 shadow-md">
          <h3 className="mb-4 text-xl font-bold text-white">Step Count</h3>
          <ResponsiveContainer width="100%" aspect={2.5}>
            <BarChart data={validResult}>
              <XAxis dataKey="date" stroke="#a0aec0" />
              <YAxis stroke="#a0aec0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2d3748",
                  border: "1px solid #4a5568",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#e2e8f0", fontWeight: "bold" }}
                itemStyle={{ color: "#4acd8d" }}
              />
              <Bar type="monotone" dataKey="step_count" fill="#4acd8d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Glucose Level Chart */}
        <div className="flex-1 rounded-2xl bg-[#13131a] p-6 shadow-md">
          <h3 className="mb-4 text-xl font-bold text-white">Glucose Level</h3>
          <ResponsiveContainer width="100%" aspect={2.5}>
            <LineChart data={validGlucose}>
              <XAxis dataKey="date" stroke="#a0aec0" />
              <YAxis stroke="#a0aec0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2d3748",
                  border: "1px solid #4a5568",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#e2e8f0", fontWeight: "bold" }}
                itemStyle={{ color: "#f6ad55" }}
              />
              <Line type="monotone" dataKey="glucose_level" stroke="#f6ad55" strokeWidth={3} dot={{ fill: '#f6ad55' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// PropTypes for validation
ActivityCard.propTypes = {
  result: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      step_count: PropTypes.number.isRequired,
    })
  ).isRequired,
  glucose: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      glucose_level: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ActivityCard;
