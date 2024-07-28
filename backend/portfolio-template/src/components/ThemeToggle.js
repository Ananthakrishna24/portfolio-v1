import React from 'react';
import { motion } from 'framer-motion';

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <motion.button
      className={`w-12 h-6 rounded-full p-1 ${
        isDark ? 'bg-navy' : 'bg-light-bg'
      }`}
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`w-4 h-4 rounded-full ${
          isDark ? 'bg-white' : 'bg-light-primary'
        }`}
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;