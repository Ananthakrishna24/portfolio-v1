import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
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
        className="text-3xl font-bold mb-8 text-light-text dark:text-[#ccd6f6]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h2>
      <motion.div
        className="space-y-6 text-lg leading-relaxed text-light-text dark:text-[#8892b0]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={childVariants} className="text-justify hyphens-auto">
          Since 2015, I've been on an exhilarating journey through the digital realm, crafting experiences that blend creativity with cutting-edge technology. My path has led me from <motion.span className="text-light-primary dark:text-green" whileHover={{ scale: 1.1 }}>innovative startups</motion.span> to <motion.span className="text-light-primary dark:text-green" whileHover={{ scale: 1.1 }}>Fortune 500 giants</motion.span>, always with a focus on pushing the boundaries of what's possible on the web.
        </motion.p>
        <motion.p variants={childVariants} className="text-justify hyphens-auto">
          Currently, I'm channeling my passion into creating intuitive and accessible interfaces at <motion.span className="text-light-primary dark:text-green" whileHover={{ scale: 1.1 }}>TechNova Solutions</motion.span>. I thrive in the sweet spot where design meets functionality, crafting solutions that are not only visually stunning but also robust under the hood. In my spare time, I've developed a <motion.span className="text-light-primary dark:text-green" whileHover={{ scale: 1.1 }}>series of interactive workshops</motion.span> on advanced React techniques and state management strategies.
        </motion.p>
        <motion.p variants={childVariants} className="text-justify hyphens-auto">
          Away from the keyboard, you'll find me exploring the great outdoors, experimenting with new cooking recipes, or diving into the latest sci-fi novel. I'm also an avid supporter of open-source projects and regularly contribute to various community-driven initiatives.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default About;