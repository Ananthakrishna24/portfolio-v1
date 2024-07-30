import React from 'react';
import { motion } from 'framer-motion';

const MobilePopup = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-x-4 bottom-24 z-50"
    >
      <div className="bg-navy bg-opacity-70 backdrop-filter backdrop-blur-lg border border-green border-opacity-20 rounded-lg p-4 shadow-lg">
        <p className="text-lightest-slate text-sm mb-3">
          For the best experience, please view this website on a desktop device.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-green bg-opacity-10 text-green border border-green rounded px-4 py-2 text-sm font-medium hover:bg-opacity-20 transition-colors duration-300"
        >
          Okay
        </button>
      </div>
    </motion.div>
  );
};

export default MobilePopup;