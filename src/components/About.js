import React from 'react';
import { motion } from 'framer-motion';
import { USER_INFO } from '../constants/userInfo';

const About = () => {
  const { about, education } = USER_INFO;

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

      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-6 text-[#ccd6f6]">
          Education
        </h3>
        {education.map((edu, index) => (
          <div 
            key={index}
            className="mb-6 p-4 rounded-lg border border-green/20 transition-all duration-300 hover:bg-lightest-navy/50 group"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div>
                <p className="text-[#ccd6f6] font-semibold text-xl">{edu.institution}</p>
                <p className="text-[#8892b0] mt-1">{edu.degree}</p>
              </div>
              <div className="hidden lg:block text-sm">
                <p className="text-[#ccd6f6]">{edu.date}</p>
                <p className="text-[#ccd6f6]">{edu.gpa}</p>
              </div>
            </div>
            {edu.courses && (
              <div className="mt-4">
                <p className="text-[#8892b0] text-sm">Relevant Coursework:</p>
                <p className="text-[#a8b2d1] mt-1 text-sm">{edu.courses}</p>
              </div>
            )}
            <div className="mt-2 lg:hidden text-sm flex justify-between">
              <p className="text-[#ccd6f6]">{edu.date}</p>
              <p className="text-[#ccd6f6]">{edu.gpa}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default About;