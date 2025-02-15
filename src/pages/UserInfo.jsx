import { useEffect, useState } from "react";
import { useStateContext } from "../context";

const UserList = () => {
  const { fetchUsers, users, fetchUserRecords, records } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchUsers(), fetchUserRecords()]);
      setLoading(false);
    };
    fetchData();
  }, [fetchUsers, fetchUserRecords]);

  const toggleExpand = (userId) => {
    setExpanded((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-gray-500">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-16 max-w-6xl rounded-lg bg-[#1c1c24] p-8 shadow-lg">
      <h1 className="mb-6 text-3xl font-semibold text-white text-center">User List & Records</h1>
      {users.length === 0 ? (
        <div className="text-lg text-gray-500 text-center">No users found.</div>
      ) : (
        <div className="grid grid-cols-3 gap-6 bg-[#2a2a35] p-6 rounded-lg shadow-md">
          <div className="text-lg font-semibold text-white border-b pb-2 col-span-1">User</div>
          <div className="text-lg font-semibold text-white border-b pb-2 col-span-2">Analysis</div>
          {users.map((user) => (
            <>
              <div key={user.id} className="p-4 bg-[#323248] rounded-lg shadow-md">
                <p className="text-lg font-semibold text-white">{user.username}</p>
                <p className="text-sm text-gray-400">Email: {user.createdBy}</p>
                <p className="text-sm text-gray-400">Age: {user.age || "N/A"}</p>
                <p className="text-sm text-gray-400">Location: {user.location || "N/A"}</p>
              </div>
              <div className="col-span-2 p-4 bg-[#323248] rounded-lg shadow-md">
                {records.filter(record => record.userId === user.id).length > 0 ? (
                  records.filter(record => record.userId === user.id).map((record, index) => (
                    <div key={record.id} className="text-sm text-gray-400">
                      {expanded[user.id] || index < 5 ? (
                        <p>{record.analysisResult}</p>
                      ) : index === 5 ? (
                        <button 
                          onClick={() => toggleExpand(user.id)}
                          className="text-blue-400 hover:underline mt-2"
                        >
                          Read More
                        </button>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No analysis available</p>
                )}
                {expanded[user.id] && (
                  <button 
                    onClick={() => toggleExpand(user.id)}
                    className="text-blue-400 hover:underline mt-2"
                  >
                    Show Less
                  </button>
                )}
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;