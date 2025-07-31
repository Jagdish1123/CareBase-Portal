import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { motion } from "framer-motion";
import { IconChevronRight } from "@tabler/icons-react";

const UserList = () => {
  const navigate = useNavigate();
  const { fetchUsers, users, fetchAllUserRecords, allUserRecords } = useStateContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchUsers();
      await fetchAllUserRecords();
      setLoading(false);
    };
    fetchData();
  }, [fetchUsers, fetchAllUserRecords]);

  const userWithRecordCounts = useMemo(() => {
    if (!users || !allUserRecords) return [];

    return users.map(user => {
      const userRecords = allUserRecords.filter(record => record.createdBy === user.createdBy);
      return {
        ...user,
        recordCount: userRecords.length,
      };
    });
  }, [users, allUserRecords]);

  const handleRowClick = async (email) => {
    navigate(`/user-info`, { state: { userEmail: email } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="mx-auto mt-16 max-w-6xl rounded-2xl bg-gray-800 p-8 shadow-xl">
      <h1 className="mb-8 text-center text-3xl font-extrabold text-white">All Patients</h1>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="text-lg text-gray-400">Loading patient data...</div>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center text-lg text-gray-400">No patients found.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Age</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-300">Records</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <motion.tbody
              className="divide-y divide-gray-700"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {userWithRecordCounts.map((user) => (
                <motion.tr
                  key={user.createdBy}
                  onClick={() => handleRowClick(user.createdBy)}
                  className="cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-700"
                  variants={itemVariants}
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-white">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.age || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.recordCount}</td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <IconChevronRight size={20} className="text-gray-400" />
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
