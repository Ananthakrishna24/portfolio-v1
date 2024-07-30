import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { USER_INFO } from '../constants/userInfo';

const ProjectCard = ({ title, description, link, technologies, stars }) => (
  <motion.div
    className="bg-[#1e2a3a] rounded-lg overflow-hidden shadow-lg mb-6 p-6 hover:bg-[#2a3b4d] transition-colors duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-semibold text-[#64ffda]">
        <a href={link} className="hover:underline">
          {title}
          <span className="ml-2 text-[#8892b0] text-sm">↗</span>
        </a>
      </h3>
      {stars > 0 && (
        <div className="flex items-center text-[#8892b0]">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{stars}</span>
        </div>
      )}
    </div>
    <p className="text-[#a8b2d1] mb-4">{description}</p>
    <div className="flex flex-wrap">
      {technologies.map((tech, index) => (
        <span
          key={index}
          className="bg-[#112240] text-[#64ffda] rounded-full px-3 py-1 text-sm mr-2 mb-2"
        >
          {tech}
        </span>
      ))}
    </div>
  </motion.div>
);

const Projects = () => {
  const { projects } = USER_INFO;
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 3;
  const pageCount = Math.ceil(projects.length / projectsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const currentProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <motion.h2
        className="text-3xl font-bold mb-8 text-[#ccd6f6] text-center sm:text-left"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Featured Projects
      </motion.h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="sticky bottom-4 left-0 right-0 flex justify-between items-center mt-8">
        <button
          onClick={handlePrevPage}
          className={`bg-[#112240] text-[#64ffda] p-2 rounded-full hover:bg-[#1d3a6d] transition-colors duration-300 ${
            currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={currentPage === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {currentPage < pageCount - 1 && (
          <button
            onClick={handleNextPage}
            className="bg-[#112240] text-[#64ffda] p-2 rounded-full hover:bg-[#1d3a6d] transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Projects;