import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import CursorLight from "./CursorLight";
import { USER_INFO } from "../constants/userInfo";

const NavItem = ({ to, label, className = "" }) => {
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
        {label}
      </motion.div>
    </Link>
  );
};

const Layout = ({ children }) => {
  const { name, title, email, phone, location, socialLinks } = USER_INFO;

  return (
    <div className="min-h-screen dark bg-navy text-slate">
      <div className="fixed inset-0 pointer-events-none z-0">
        <CursorLight />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="py-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-lightest-slate mb-2">
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

        <nav className="py-4 mb-8">
          <div className="flex justify-center space-x-4 sm:space-x-8">
            <NavItem to="/" label="ABOUT" />
            <NavItem to="/experience" label="EXPERIENCE" />
            <NavItem to="/projects" label="PROJECTS" />
          </div>
        </nav>

        <main>{children}</main>

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
      </div>
    </div>
  );
};

export default Layout;