import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Briefcase, Code } from "lucide-react";
import CursorLight from "./CursorLight";
import { USER_INFO } from "../constants/userInfo";

const NavItem = ({ to, label, icon: Icon, className = "" }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative py-2 px-4 ${className}`}
    >
      <motion.div
        className={`w-full h-full flex flex-col items-center justify-center ${
          isActive
            ? "text-green dark:text-green"
            : "text-light-text dark:text-gray-400"
        } hover:text-light-primary dark:hover:text-green transition-colors duration-300`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon size={20} className="mb-1" />
        <span className="text-xs">{label}</span>
      </motion.div>
    </Link>
  );
};

const Layout = ({ children }) => {
  const { name, title, email, phone, location, socialLinks } = USER_INFO;
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
  }, [isMobile]);

  return (
    <div className="min-h-screen dark bg-navy text-slate flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <CursorLight />
      </div>
      <div className={`flex-grow ${isMobile ? 'pb-20' : ''}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="py-4 relative z-10"
            >
              <div className="flex space-x-4 justify-center">
                {Object.entries(socialLinks).map(([platform, url]) => (
                  <motion.a
                    key={platform}
                    href={url}
                    className="text-lightest-slate hover:text-green transition duration-300"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className={`fab fa-${platform}`}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
          <header className="py-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-lightest-slate mb-2 mobile-center">
              {name}
            </h1>
            <p className="text-xl sm:text-2xl mb-4 text-green">
              {title}
            </p>
            <div className="flex justify-center items-center space-x-4 mb-2 text-slate">
              <a href={`mailto:${email}`} className="hover:text-green transition-colors duration-300">
                {email}
              </a>
              <span>|</span>
              <a href={`tel:${phone}`} className="hover:text-green transition-colors duration-300">
                {phone}
              </a>
            </div>
            <p className="text-slate">
              {location}
            </p>
          </header>

          {!isMobile && (
            <nav className="py-4 mb-8">
              <div className="flex justify-center space-x-4 sm:space-x-8">
                <NavItem to="/" label="ABOUT" icon={User} />
                <NavItem to="/experience" label="EXPERIENCE" icon={Briefcase} />
                <NavItem to="/projects" label="PROJECTS" icon={Code} />
              </div>
            </nav>
          )}

          <main>{children}</main>

          {!isMobile && (
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="py-6 mt-12 relative z-10"
            >
              <div className="flex space-x-4 justify-center">
                {Object.entries(socialLinks).map(([platform, url]) => (
                  <motion.a
                    key={platform}
                    href={url}
                    className="text-lightest-slate hover:text-green transition duration-300"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className={`fab fa-${platform}`}></i>
                  </motion.a>
                ))}
              </div>
            </motion.footer>
          )}
        </div>
      </div>
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-navy border-t border-light-primary dark:border-green z-50">
          <div className="flex justify-around h-16">
            <NavItem to="/" label="ABOUT" icon={User} />
            <NavItem to="/experience" label="EXPERIENCE" icon={Briefcase} />
            <NavItem to="/projects" label="PROJECTS" icon={Code} />
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;