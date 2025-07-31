import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import { GiBodyHeight, GiWeight, GiHeartBeats, GiRunningShoe } from "react-icons/gi";
import { FaHeartbeat } from "react-icons/fa";

const AnimatedBox = motion.div;

const cardVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
};

const HealthStatsCard = ({ weight, height, BP, step, heart }) => {
  const minimizedHeight = Math.floor(height);
  const formattedNumber = step.toLocaleString();
  const validBP = Array.isArray(BP) && BP.length === 2 ? `${BP[0]}/${BP[1]}` : "120/80";
  const validWeight = parseInt(weight, 10);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-2 m-2">
      <AnimatedBox
        as="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.3 }}
        className="w-[250px] p-4 text-center text-white bg-blue-500 border-2 border-gray-300 rounded-xl shadow-md"
      >
        <GiBodyHeight size={32} className="mx-auto mb-4" />
        <h3>Height</h3>
        <p>{minimizedHeight} cm</p>
      </AnimatedBox>

      <AnimatedBox
        as="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.3 }}
        className="w-[250px] p-4 text-center text-white bg-green-500 border-2 border-gray-300 rounded-xl shadow-md"
      >
        <GiWeight size={32} className="mx-auto mb-4" />
        <h3>Weight</h3>
        <p>{validWeight} kg</p>
      </AnimatedBox>

      <AnimatedBox
        as="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.3 }}
        className="w-[250px] p-4 text-center text-white bg-red-500 border-2 border-gray-300 rounded-xl shadow-md"
      >
        <FaHeartbeat size={32} className="mx-auto mb-4" />
        <h3>Blood Pressure</h3>
        <p>{validBP} mmHg</p>
      </AnimatedBox>

      <AnimatedBox
        as="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.3 }}
        className="w-[250px] p-4 text-center text-white bg-pink-500 border-2 border-gray-300 rounded-xl shadow-md"
      >
        <GiRunningShoe size={32} className="mx-auto mb-4" />
        <h3>Step Count</h3>
        <p>{formattedNumber}</p>
      </AnimatedBox>

      <AnimatedBox
        as="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.3 }}
        className="w-[250px] p-4 text-center text-white bg-blue-500 border-2 border-gray-300 rounded-xl shadow-md"
      >
        <GiHeartBeats size={32} className="mx-auto mb-4" />
        <h3>Heart Rate</h3>
        <p>{heart ? `${heart} bpm` : "N/A"}</p>
      </AnimatedBox>
    </div>
  );
};

HealthStatsCard.propTypes = {
  weight: PropTypes.number,
  height: PropTypes.number,
  BP: PropTypes.arrayOf(PropTypes.number),
  step: PropTypes.number,
  heart: PropTypes.number,
};

HealthStatsCard.defaultProps = {
  weight: 0,
  height: 0,
  BP: [120, 80],
  step: 0,
  heart: null,
};

export default HealthStatsCard;