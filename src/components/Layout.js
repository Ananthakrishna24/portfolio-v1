import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavItem = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div 
      className="relative py-2 px-4 mb-4"
      whileHover="hover"
    >
      <Link to={to} className={`relative z-10 text-${isActive ? 'green' : 'gray-400'} hover:text-green transition-colors duration-300`}>
        {label}
      </Link>
      <motion.div
        className="absolute left-0 top-0 bottom-0 bg-lightest-navy rounded-r-full"
        initial={{ width: isActive ? '100%' : '0%' }}
        animate={{ width: isActive ? '100%' : '0%' }}
        variants={{
          hover: { width: '100%' }
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-navy text-slate overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="py-12 relative z-10"
        >
          <div className="text-center lg:text-left">
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold text-lightest-slate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Ananthakrishna
            </motion.h1>
            <motion.p 
              className="text-xl sm:text-2xl mt-2 text-green"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Senior Frontend Engineer
            </motion.p>
            <motion.p 
              className="mt-4 text-slate max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Crafting digital experiences that push the boundaries of web technology.
            </motion.p>
          </div>
        </motion.header>

        <div className="flex flex-col lg:flex-row">
          <nav className="w-full lg:w-1/4 mb-8 lg:mb-0">
            <motion.div 
              className="flex lg:flex-col justify-center lg:justify-start space-x-4 lg:space-x-0 lg:space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <NavItem to="/" label="ABOUT" />
              <NavItem to="/experience" label="EXPERIENCE" />
              <NavItem to="/projects" label="PROJECTS" />
            </motion.div>
          </nav>

          <main className="w-full lg:w-3/4 lg:pl-8">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </main>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="py-6 mt-12 relative z-10"
        >
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
        </motion.footer>
      </div>
    </div>
  );
};

export default Layout;