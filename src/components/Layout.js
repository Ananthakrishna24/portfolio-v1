import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Briefcase, Code } from "lucide-react";
import CursorLight from "./CursorLight";
import { USER_INFO } from "../constants/userInfo";

const NavItem = ({ to, label, icon: Icon, className = "", isMobile }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative py-2 px-4 ${className}`}
    >
      <motion.div
        className={`w-full h-full flex items-center justify-center ${
          isActive
            ? "text-green dark:text-green"
            : "text-light-text dark:text-gray-400"
        } hover:text-light-primary dark:hover:text-green transition-colors duration-300`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMobile && <Icon size={24} className="mr-2" />}
        <span className={isMobile ? "text-sm" : "text-sm font-medium"}>{label}</span>
      </motion.div>
      {!isMobile && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-green"
          initial={false}
          animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      )}
    </Link>
  );
};

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#64ffda" />
    <text 
      x="16" 
      y="16" 
      fontSize="18" 
      fontWeight="bold" 
      fontFamily="Arial, sans-serif" 
      fill="#0a192f" 
      textAnchor="middle" 
      dominantBaseline="central"
    >
      A
    </text>
  </svg>
);

const Layout = ({ children }) => {
  const { name, title, email, phone, location, socialLinks, resumeLink } = USER_INFO;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const viewport = document.querySelector("meta[name=viewport]");
    if (viewport) {
      if (isMobile) {
        viewport.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no");
      } else {
        viewport.setAttribute("content", "width=device-width, initial-scale=1");
      }
    }

    // Add background color to html and body
    document.documentElement.style.backgroundColor = '#0a192f';
    document.body.style.backgroundColor = '#0a192f';
  }, [isMobile]);

  return (
    <div className="min-h-screen dark bg-navy text-slate flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <CursorLight />
      </div>

      {!isMobile && (
        <nav className="bg-navy border-b border-light-primary dark:border-green sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <Logo />
              </div>
              <div className="flex space-x-8">
                <NavItem to="/" label="About" isMobile={false} />
                <NavItem to="/experience" label="Experience" isMobile={false} />
                <NavItem to="/projects" label="Projects" isMobile={false} />
              </div>
              <div className="flex space-x-6">
                {Object.entries(socialLinks).map(([platform, url]) => (
                  <motion.a
                    key={platform}
                    href={url}
                    className="text-lightest-slate hover:text-green transition duration-300"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className={`fab fa-${platform} text-2xl`}></i>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </nav>
      )}

      <div className="flex-grow flex flex-col">
        <div className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="py-4 relative z-10"
            >
              <div className="flex justify-center space-x-6">
                {Object.entries(socialLinks).map(([platform, url]) => (
                  <motion.a
                    key={platform}
                    href={url}
                    className="text-lightest-slate hover:text-green transition duration-300"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className={`fab fa-${platform} text-3xl`}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
          <header className="py-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-lightest-slate mb-2">
              {name}
            </h1>
            <p className="text-xl sm:text-2xl mb-4 text-green">
              {title}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 text-slate">
              <a href={`mailto:${email}`} className="hover:text-green transition-colors duration-300">
                {email}
              </a>
              <span className="hidden sm:inline">|</span>
              <a href={`tel:${phone}`} className="hover:text-green transition-colors duration-300">
                {phone}
              </a>
            </div>
            <p className="text-slate mb-6">
              {location}
            </p>
            <a
              href={resumeLink}
              download
              className="inline-block px-6 py-3 text-green border border-green rounded hover:bg-green hover:bg-opacity-10 transition-colors duration-300"
            >
              Download CV
            </a>
          </header>

          <main>{children}</main>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="py-3 mt-auto relative z-10 bg-navy text-sm"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-lightest-slate">
              <p>&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
            </div>
          </div>
        </motion.footer>
      </div>

      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-navy border-t border-light-primary dark:border-green z-50">
          <div className="flex justify-around h-20">
            <NavItem to="/" label="ABOUT" icon={User} isMobile={true} />
            <NavItem to="/experience" label="EXPERIENCE" icon={Briefcase} isMobile={true} />
            <NavItem to="/projects" label="PROJECTS" icon={Code} isMobile={true} />
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;