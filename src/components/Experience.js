import React from 'react';
import { motion } from 'framer-motion';
import { USER_INFO } from '../constants/userInfo';

const JobEntry = ({ date, title, company, description, technologies, index }) => (
  <motion.div
    className="mb-12 relative pl-8 border-l-2 border-light-primary dark:border-green"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
  >
    <motion.div
      className="absolute left-0 w-4 h-4 bg-light-primary dark:bg-green rounded-full -ml-[9px]"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, delay: index * 0.2 + 0.5 }}
    />
    <motion.div className="text-light-primary dark:text-green mb-1" whileHover={{ x: 5 }}>{date}</motion.div>
    <motion.h3 className="text-xl font-semibold mb-2 text-light-text dark:text-white" whileHover={{ x: 5 }}>
      {title} · {company}
    </motion.h3>
    <motion.p className="mb-2 text-light-text dark:text-slate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.2 + 0.3 }}>
      {description}
    </motion.p>
    <div className="flex flex-wrap">
      {technologies.map((tech, techIndex) => (
        <motion.span
          key={techIndex}
          className="bg-light-bg dark:bg-lightest-navy text-light-primary dark:text-green rounded-full px-3 py-1 text-sm mr-2 mb-2"
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 + 0.5 + techIndex * 0.1 }}
        >
          {tech}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

const Experience = () => {
  const { experience } = USER_INFO;

  return (
    <div className="mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-8 text-lightest-slate"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Where I've Worked
      </motion.h2>
      {experience.map((job, index) => (
        <JobEntry key={index} {...job} index={index} />
      ))}
    </div>
  );
};

export default Experience;