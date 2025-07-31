import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { usePrivy } from "@privy-io/react-auth";
import { motion } from "framer-motion";
import { IconStethoscope, IconBriefcase, IconMapPin, IconUser } from "@tabler/icons-react";

const DoctorLogin = () => {
  const { createDoctor } = useStateContext();
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = usePrivy();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user || !user.email || !user.email.address) {
      console.error("User or user.email is not defined");
      setLoading(false);
      return;
    }

    const doctorData = {
      name,
      specialization,
      experience: parseInt(experience, 10),
      location,
      createdBy: user.email.address,
    };

    try {
      const newDoctor = await createDoctor(doctorData);
      if (newDoctor) {
        navigate("/doctor-dashboard");
      }
    } catch (error) {
      console.error("Failed to create doctor:", error);
      alert("An error occurred during login. Please try again.");
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
        <h2 className="mb-8 text-center text-3xl font-extrabold text-white">Doctor Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-400">Name</label>
            <div className="relative">
              <IconUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <motion.input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl bg-gray-700 py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                variants={inputVariants}
                whileHover="hover"
                whileFocus={{ scale: 1.02, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="specialization" className="mb-2 block text-sm font-medium text-gray-400">Specialization</label>
            <div className="relative">
              <IconStethoscope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <motion.input
                id="specialization"
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
                className="w-full rounded-xl bg-gray-700 py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                variants={inputVariants}
                whileHover="hover"
                whileFocus={{ scale: 1.02, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="experience" className="mb-2 block text-sm font-medium text-gray-400">Experience (Years)</label>
            <div className="relative">
              <IconBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <motion.input
                id="experience"
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
                className="w-full rounded-xl bg-gray-700 py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                variants={inputVariants}
                whileHover="hover"
                whileFocus={{ scale: 1.02, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="location" className="mb-2 block text-sm font-medium text-gray-400">Location</label>
            <div className="relative">
              <IconMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
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
            {loading ? "Logging In..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default DoctorLogin;
