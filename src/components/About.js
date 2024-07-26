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
    <motion.div
      className="space-y-6 text-lg leading-relaxed max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p variants={childVariants}>
        Since 2015, I've been on an exhilarating journey through the digital realm, crafting experiences that blend creativity with cutting-edge technology. My path has led me from <motion.span className="text-green" whileHover={{ scale: 1.1 }}>innovative startups</motion.span> to <motion.span className="text-green" whileHover={{ scale: 1.1 }}>Fortune 500 giants</motion.span>, always with a focus on pushing the boundaries of what's possible on the web.
      </motion.p>
      <motion.p variants={childVariants}>
        Currently, I'm channeling my passion into creating intuitive and accessible interfaces at <motion.span className="text-green" whileHover={{ scale: 1.1 }}>TechNova Solutions</motion.span>. I thrive in the sweet spot where design meets functionality, crafting solutions that are not only visually stunning but also robust under the hood. In my spare time, I've developed a <motion.span className="text-green" whileHover={{ scale: 1.1 }}>series of interactive workshops</motion.span> on advanced React techniques and state management strategies.
      </motion.p>
      <motion.p variants={childVariants}>
        Away from the keyboard, you'll find me exploring the great outdoors, experimenting with new cooking recipes, or diving into the latest sci-fi novel. I'm also an avid supporter of open-source projects and regularly contribute to various community-driven initiatives.
      </motion.p>
    </motion.div>
  );
};

export default About;