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
import MetricsCard from "../components/MetricsCard";
import { useStateContext } from "../context";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { users, fetchUsers, fetchUserByEmail } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  
  useEffect(() => {
    const getUsers = async () => {
      await fetchUsers();
      setLoading(false);
    };
    getUsers();
  }, [fetchUsers]);

  const handleRowClick = async (email) => {
    setSelectedUser(email);
    await fetchUserByEmail(email);
    navigate(`/user-info`);
  };

  const metricsData = [
    { title: "Total Patients", subtitle: "View", value: users.length, icon: IconUserCheck, onClick: () => navigate("/patients") },
    { title: "Scheduled Appointments", subtitle: "View", value: 0, icon: IconCalendarEvent, onClick: () => navigate("/appointments") },
    { title: "Completed Appointments", subtitle: "View", value: 0, icon: IconAlertCircle, onClick: () => navigate("/appointments/completed") },
    { title: "Missed Appointments", subtitle: "View", value: 0, icon: IconUserX, onClick: () => navigate("/appointments/missed") },
    { title: "Pending Screenings", subtitle: "View", value: 0, icon: IconClipboardText, onClick: () => navigate("/screenings/pending") },
    { title: "Urgent Cases", subtitle: "View", value: 0, icon: IconAlertTriangle, onClick: () => navigate("/urgent-cases") },
  ];

  return (
    <div className="flex flex-wrap gap-6">
      <div className="mt-7 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metricsData.map((metric) => (
          <MetricsCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="p-6 bg-[#13131A] rounded-lg shadow text-white flex-col mx-auto w-3/4">
        <h2 className="text-xl font-semibold mb-4 text-center animate-fade-in">Patient List</h2>

        {loading ? (
          <div className="text-center text-gray-400">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="text-center text-gray-400">No patients found.</div>
        ) : (
          <table className="w-full border-collapse border border-[#00C54E] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#32e47a] text-black text-lg">
                <th className="border border-[#00C54E] px-10 py-3">Name</th>
                <th className="border border-[#00C54E] px-10 py-3">Age</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.email}
                  onClick={() => handleRowClick(user.email)}
                  className={`text-center cursor-pointer transition-all duration-300 transform 
                    ${selectedUser === user.email ? "bg-black text-[#4ce689] scale-105" : "hover:bg-[#32e47a] hover:text-black hover:scale-105"} animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
                >
                  <td className="border border-[rgb(93,214,142)] px-10 py-3 font-medium">{user.username}</td>
                  <td className="border border-[#56e991] px-10 py-3 font-medium">{user.age || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
