import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CursorLight from './CursorLight';

const NavItem = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div 
      className="relative py-2 px-4 mb-4"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={to} className={`relative z-10 text-${isActive ? 'green' : 'gray-400'} hover:text-green transition-colors duration-300`}>
        {label}
      </Link>
    </motion.div>
  );
};

const Layout = ({ children }) => {
  const location = useLocation();
  const sections = useRef([]);

  useEffect(() => {
    sections.current = document.querySelectorAll('section');
    let currentSectionIndex = 0;

    const handleScroll = (e) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(sections.current.length - 1, currentSectionIndex + direction));

      if (nextIndex !== currentSectionIndex) {
        currentSectionIndex = nextIndex;
        sections.current[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-navy text-slate">
      <CursorLight />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          className="py-12 relative z-10 text-center"
        >
          <div>
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
              className="mt-4 text-slate max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Crafting digital experiences that push the boundaries of web technology.
            </motion.p>
          </div>
        </motion.header>

        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
          className="py-4 mb-8 relative z-10"
        >
          <motion.div 
            className="flex flex-wrap justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <NavItem to="/" label="ABOUT" />
            <NavItem to="/experience" label="EXPERIENCE" />
            <NavItem to="/projects" label="PROJECTS" />
          </motion.div>
        </motion.nav>

        <main>
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