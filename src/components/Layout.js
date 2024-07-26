import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NavItem = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div 
      className="relative py-2 pl-8"
      initial={false}
      animate={{ x: isActive ? 5 : 0 }}
    >
      <Link 
        to={to} 
        className={`text-${isActive ? 'white' : 'gray-400'} hover:text-white transition-colors duration-300`}
      >
        {label}
      </Link>
      <motion.div
        className="absolute left-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-green"
        initial={{ width: 0 }}
        animate={{ width: isActive ? 24 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-navy text-slate overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="mb-12 relative z-10"
        >
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
        </motion.header>

        <div className="flex">
          <nav className="w-1/4">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <NavItem to="/" label="ABOUT" />
              <NavItem to="/experience" label="EXPERIENCE" />
              <NavItem to="/projects" label="PROJECTS" />
            </motion.div>
          </nav>

          <main className="w-3/4 relative z-10">
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
        </div>
      </div>

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