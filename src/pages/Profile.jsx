import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useStateContext } from "../context";
import { usePrivy } from "@privy-io/react-auth";
import { IconUserCircle, IconAt, IconCalendar, IconMapPin } from "@tabler/icons-react";

const Profile = () => {
  const { currentUser, fetchUserByEmail } = useStateContext();
  const { user } = usePrivy();

  useEffect(() => {
    if (!currentUser && user?.email?.address) {
      fetchUserByEmail(user.email.address);
    }
  }, [currentUser, fetchUserByEmail, user]);

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#13131a]">
        <span className="text-lg text-gray-400">Loading user profile...</span>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-[#13131a] p-8">
      <motion.div
        className="mx-auto mt-16 w-full max-w-lg rounded-2xl bg-[#1c1c24] p-8 shadow-xl"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col items-center border-b border-gray-700 pb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-700 shadow-inner">
            <IconUserCircle size={96} className="text-green-500" />
          </div>
          <motion.h1 className="text-3xl font-bold text-white" variants={itemVariants}>
            {currentUser.username}
          </motion.h1>
          <motion.p className="text-sm text-gray-400 mt-1" variants={itemVariants}>
            <IconAt size={14} className="inline-block mr-1" />
            {currentUser.createdBy}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-8 w-full space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center space-x-4">
            <IconCalendar size={24} className="text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-400">Age</p>
              <p className="text-lg font-semibold text-white">{currentUser.age || "N/A"}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center space-x-4">
            <IconMapPin size={24} className="text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-400">Location</p>
              <p className="text-lg font-semibold text-white">{currentUser.location || "N/A"}</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
