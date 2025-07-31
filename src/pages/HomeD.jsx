import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconUserCheck,
  IconUserX,
  IconClipboardText,
  IconCalendarEvent,
  IconAlertTriangle,
  IconAlertCircle,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import MetricsCard from "../components/MetricsCard";
import { useStateContext } from "../context";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { users, fetchUsers, fetchUserByEmail, currentUser } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      await fetchUsers();
      setLoading(false);
    };
    getUsers();
  }, [fetchUsers]);

  const handleRowClick = async (email) => {
    setSelectedUserEmail(email);
    await fetchUserByEmail(email);
    navigate(`/user-info`);
  };

  const metricsData = [
    { title: "Total Patients", subtitle: "View All", value: users.length, icon: IconUserCheck, onClick: () => navigate("/patients") },
    { title: "Scheduled Appointments", subtitle: "View All", value: 0, icon: IconCalendarEvent, onClick: () => navigate("/appointments") },
    { title: "Completed Appointments", subtitle: "View All", value: 0, icon: IconAlertCircle, onClick: () => navigate("/appointments/completed") },
    { title: "Missed Appointments", subtitle: "View All", value: 0, icon: IconUserX, onClick: () => navigate("/appointments/missed") },
    { title: "Pending Screenings", subtitle: "View All", value: 0, icon: IconClipboardText, onClick: () => navigate("/screenings/pending") },
    { title: "Urgent Cases", subtitle: "View All", value: 0, icon: IconAlertTriangle, onClick: () => navigate("/urgent-cases") },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mt-7 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metricsData.map((metric) => (
          <motion.div key={metric.title} variants={itemVariants}>
            <MetricsCard {...metric} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mx-auto w-full max-w-4xl rounded-2xl bg-[#1c1c24] p-8 shadow-xl text-white"
        variants={itemVariants}
      >
        <h2 className="mb-6 text-2xl font-extrabold text-center">Patient List</h2>

        {loading ? (
          <div className="text-center text-gray-400">Loading patients...</div>
        ) : users.length === 0 ? (
          <div className="text-center text-gray-400">No patients found.</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="min-w-full table-auto">
              <thead className="bg-[#4acd8d] text-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Age</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user) => (
                  <tr
                    key={user.email}
                    onClick={() => handleRowClick(user.email)}
                    className={`cursor-pointer transition-colors duration-200 ease-in-out ${
                      selectedUserEmail === user.email ? "bg-gray-700 text-green-400" : "hover:bg-gray-700"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.age || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DoctorDashboard;
