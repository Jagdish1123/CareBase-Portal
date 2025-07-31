import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { usePrivy } from "@privy-io/react-auth";
import { motion } from "framer-motion";
import { IconUser, IconHome, IconCalendar } from "@tabler/icons-react";

const Onboarding = () => {
  const { createUser } = useStateContext();
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = usePrivy();

  const handleOnboarding = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user || !user.email || !user.email.address) {
      console.error("User or user email address is not defined");
      setLoading(false);
      return;
    }

    const userData = {
      username,
      age: parseInt(age, 10),
      location,
      folders: [],
      treatmentCounts: 0,
      folder: [],
      createdBy: user.email.address,
    };

    try {
      await createUser(userData);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to create user:", error);
      alert("An error occurred during onboarding. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const inputVariants = {
    rest: { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
    hover: { scale: 1.02, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      <motion.div
        className="w-full max-w-md rounded-2xl bg-gray-800 p-8 shadow-xl"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="mb-2 text-center text-5xl font-bold text-white">👋</h2>
        <h2 className="mb-8 text-center text-2xl font-bold text-white">
          Welcome! Please tell us about yourself.
        </h2>
        <form onSubmit={handleOnboarding} className="space-y-6">
          <div>
            <label htmlFor="username" className="mb-2 block text-sm text-gray-400 font-medium">
              Username
            </label>
            <div className="relative">
              <IconUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <motion.input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-xl bg-gray-700 py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                variants={inputVariants}
                whileHover="hover"
                whileFocus={{ scale: 1.02, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="age" className="mb-2 block text-sm text-gray-400 font-medium">
              Age
            </label>
            <div className="relative">
              <IconCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <motion.input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="w-full rounded-xl bg-gray-700 py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                variants={inputVariants}
                whileHover="hover"
                whileFocus={{ scale: 1.02, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="location" className="mb-2 block text-sm text-gray-400 font-medium">
              Location
            </label>
            <div className="relative">
              <IconHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <motion.input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full rounded-xl bg-gray-700 py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                variants={inputVariants}
                whileHover="hover"
                whileFocus={{ scale: 1.02, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
              />
            </div>
          </div>
          <motion.button
            type="submit"
            className="w-full rounded-full bg-green-500 py-3 font-semibold text-gray-900 shadow-md transition-colors duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? "Getting Started..." : "Get Started"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Onboarding;
