import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CursorLight from './CursorLight';
import ThemeToggle from './ThemeToggle';

const NavItem = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div 
      className="relative py-2 px-4"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={to} className={`relative z-10 ${isActive ? 'text-green dark:text-green' : 'text-light-text dark:text-gray-400'} hover:text-light-primary dark:hover:text-green transition-colors duration-300`}>
        {label}
      </Link>
    </motion.div>
  );
};

const Layout = ({ children }) => {
  const location = useLocation();
  const sections = useRef([]);
  const [isDark, setIsDark] = useState(true);

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

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`relative min-h-screen ${isDark ? 'dark bg-navy text-slate' : 'bg-light-bg text-light-text'}`}>
      <CursorLight />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          className="py-12 relative z-10 text-center"
        >
          <div className="flex justify-end mb-4">
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          </div>
          <div>
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold text-light-text dark:text-lightest-slate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Ananthakrishna
            </motion.h1>
            <motion.p 
              className="text-xl sm:text-2xl mt-2 text-light-primary dark:text-green"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Senior Frontend Engineer
            </motion.p>
            <motion.p 
              className="mt-4 text-light-text dark:text-slate max-w-xl mx-auto"
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
            className="flex justify-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <NavItem to="/" label="ABOUT" />
            <NavItem to="/experience" label="EXPERIENCE" />
            <NavItem to="/projects" label="PROJECTS" />
          </motion.div>
        </motion.nav>

        <main className="max-w-3xl mx-auto">
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
                className="text-light-text dark:text-lightest-slate hover:text-light-primary dark:hover:text-green transition duration-300"
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