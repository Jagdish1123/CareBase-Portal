import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const FatGraph = ({ fat = [] }) => (
  <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
    <h2 className="mb-4 text-2xl font-extrabold text-white">Body Fat Trend</h2>
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart
        data={fat}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorBodyFat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
        <XAxis
          dataKey="date"
          stroke="#e2e8f0"
          tickFormatter={(dateStr) => new Date(dateStr).toLocaleDateString()}
        />
        <YAxis stroke="#e2e8f0" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#2d3748",
            border: "1px solid #4a5568",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "#e2e8f0", fontWeight: "bold" }}
          itemStyle={{ color: "#a0aec0" }}
        />
        <Area
          type="monotone"
          dataKey="body_fat_in_percent"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorBodyFat)"
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

FatGraph.propTypes = {
  fat: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      body_fat_in_percent: PropTypes.number.isRequired,
    })
  ),
};

export default FatGraph;