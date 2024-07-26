import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  return (
    <div className="min-h-screen bg-navy text-slate overflow-hidden">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="py-12 relative z-10"
      >
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-5xl font-bold text-lightest-slate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Ananthakrishna
          </motion.h1>
          <motion.p 
            className="text-2xl mt-2 text-green"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Senior Frontend Engineer
          </motion.p>
          <motion.p 
            className="mt-4 text-slate max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Crafting digital experiences that push the boundaries of web technology.
          </motion.p>
        </div>
      </motion.header>

      <motion.button
        className="fixed top-4 right-4 z-50 text-green"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMenuOpen ? "Close" : "Menu"}
      </motion.button>

      <motion.nav
        className="fixed top-0 right-0 bottom-0 w-64 bg-light-navy p-8 z-40"
        variants={menuVariants}
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
      >
        <ul className="space-y-6 font-mono text-sm">
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/" className="text-lightest-slate hover:text-green transition duration-300" onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/experience" className="text-lightest-slate hover:text-green transition duration-300" onClick={() => setIsMenuOpen(false)}>EXPERIENCE</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/projects" className="text-lightest-slate hover:text-green transition duration-300" onClick={() => setIsMenuOpen(false)}>PROJECTS</Link>
          </motion.li>
        </ul>
      </motion.nav>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="py-6 relative z-10"
      >
        <div className="container mx-auto px-4">
          <div className="flex space-x-4 justify-center">
            {['github', 'linkedin', 'codepen', 'instagram', 'twitter'].map((social) => (
              <motion.a
                key={social}
                href="#"
                className="text-lightest-slate hover:text-green transition duration-300"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className={`fab fa-${social}`}></i>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Layout;