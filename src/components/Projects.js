import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, image, link, technologies, index }) => (
  <motion.div
    className="bg-light-navy rounded-lg overflow-hidden shadow-lg"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -10 }}
  >
    <motion.img
      src={`https://via.placeholder.com/400x200.png?text=${title.replace(/\s+/g, '+')}`}
      alt={title}
      className="w-full h-48 object-cover"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    />
    <div className="p-6">
      <motion.h3
        className="text-xl font-semibold mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        <a href={link} className="text-green hover:underline">{title}</a>
      </motion.h3>
      <motion.p
        className="text-slate mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.4 }}
      >
        {description}
      </motion.p>
      <div className="flex flex-wrap">
        {technologies.map((tech, techIndex) => (
          <motion.span
            key={techIndex}
            className="bg-navy text-green rounded-full px-3 py-1 text-sm mr-2 mb-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.5 + techIndex * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const projects = [
    {
      title: "AI-Powered Task Manager",
      description: "A smart task management application that uses machine learning to prioritize and categorize tasks based on user behavior and preferences.",
      link: "#",
      technologies: ["React", "Node.js", "TensorFlow.js", "MongoDB"]
    },
    {
      title: "Virtual Reality Art Gallery",
      description: "An immersive VR experience showcasing digital art in a virtual gallery space, allowing users to interact with and purchase artwork.",
      link: "#",
      technologies: ["Three.js", "WebVR", "React", "WebGL"]
    },
    {
      title: "Blockchain-based Supply Chain",
      description: "A decentralized application for tracking product supply chains, ensuring transparency and authenticity from manufacturer to consumer.",
      link: "#",
      technologies: ["Ethereum", "Solidity", "Web3.js", "React"]
    },
    {
      title: "Eco-Friendly Smart Home System",
      description: "An IoT solution for managing home energy consumption, integrating with renewable energy sources and providing real-time analytics.",
      link: "#",
      technologies: ["React Native", "Node.js", "MQTT", "InfluxDB"]
    },
    {
      title: "AI Language Learning Assistant",
      description: "A mobile app that uses natural language processing to provide personalized language learning experiences, including real-time pronunciation feedback.",
      link: "#",
      technologies: ["Flutter", "Python", "TensorFlow", "Google Cloud Speech-to-Text"]
    },
    {
      title: "Augmented Reality City Guide",
      description: "A mobile application that overlays historical information, reviews, and navigation data onto real-world views of city landmarks and businesses.",
      link: "#",
      technologies: ["ARKit", "Swift", "CoreML", "Firebase"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-8 text-lightest-slate"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Featured Projects
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;