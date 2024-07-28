import React from 'react';
import { motion } from 'framer-motion';
import { USER_INFO } from '../constants/userInfo';

const About = () => {
  const { about } = USER_INFO;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <div className="mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-8 text-[#ccd6f6]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h2>
      <motion.div
        className="space-y-6 text-lg leading-relaxed text-[#8892b0]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {about.split('\n').map((paragraph, index) => (
          <motion.p key={index} variants={childVariants} className="text-justify hyphens-auto">
            {paragraph}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
};

export default About;