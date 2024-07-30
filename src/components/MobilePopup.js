import React from 'react';
import { motion } from 'framer-motion';

const MobilePopup = ({ onClose }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        y: [0, -10, -30],
        scale: [1, 0.9, 0.8, 0.7, 0.6, 0.1],
        transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
      }}
      className="fixed inset-x-4 bottom-24 z-50"
    >
      <motion.div
        className="bg-navy bg-opacity-70 backdrop-filter backdrop-blur-lg border border-green border-opacity-20 rounded-lg p-6 shadow-lg"
        style={{
          boxShadow: '0 4px 6px rgba(0, 255, 255, 0.1), 0 1px 3px rgba(0, 255, 255, 0.08)',
        }}
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-green text-lg font-semibold mb-2"
        >
          Welcome to My Portfolio
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lightest-slate text-sm mb-4"
        >
          For the best experience, please view this website on a desktop device. Enjoy exploring my work!
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-full bg-green bg-opacity-10 text-green border border-green rounded px-4 py-2 text-sm font-medium hover:bg-opacity-20 transition-colors duration-300"
        >
          Got it!
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default MobilePopup;