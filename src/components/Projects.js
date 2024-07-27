import React from 'react';
import { motion } from 'framer-motion';

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
      {stars && (
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
  const projects = [
    {
        title: "Weather Dashboard",
        description: "A responsive web application that provides weather forecasts and current conditions for any location. Users can search for locations and get real-time weather data.",
        link: "#",
        technologies: ["React", "Redux", "OpenWeatherMap API", "Netlify"],
        stars: 452
      },
      {
        title: "E-commerce Store",
        description: "A fully functional e-commerce website built with a modern tech stack. It features product listings, a shopping cart, user authentication, and a payment gateway.",
        link: "#",
        technologies: ["Next.js", "Stripe API", "Firebase", "Vercel"],
        stars: 892
      },
      {
        title: "Task Manager",
        description: "A productivity app that helps users manage their daily tasks. Features include task creation, deadlines, reminders, and categorization.",
        link: "#",
        technologies: ["Vue.js", "Vuex", "Node.js", "MongoDB"],
        stars: 289
      },
      {
        title: "Chat Application",
        description: "A real-time chat application with support for multiple rooms and direct messages. Includes user authentication and message history.",
        link: "#",
        technologies: ["Angular", "Socket.io", "Node.js", "Express"],
        stars: 512
      },
      {
        title: "Portfolio Website",
        description: "A personal portfolio website to showcase projects, blogs, and contact information. Built with modern design principles and responsive layouts.",
        link: "#",
        technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        stars: 645
      }
  ];

  return (
    <div className="h-full flex flex-col">
      <motion.h2
        className="text-3xl font-bold mb-8 text-[#ccd6f6]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Featured Projects
      </motion.h2>
      <motion.div
        className="flex-grow overflow-y-auto pr-4 scrollbar-hide"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;