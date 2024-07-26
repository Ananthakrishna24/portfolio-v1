import React from 'react';
import { motion } from 'framer-motion';

const JobEntry = ({ date, title, company, description, technologies, index }) => (
  <motion.div
    className="mb-12 relative pl-8 border-l-2 border-green"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
  >
    <motion.div
      className="absolute left-0 w-4 h-4 bg-green rounded-full -ml-[9px]"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, delay: index * 0.2 + 0.5 }}
    />
    <motion.div className="text-green mb-1" whileHover={{ x: 5 }}>{date}</motion.div>
    <motion.h3 className="text-xl font-semibold mb-2" whileHover={{ x: 5 }}>
      {title} · {company}
    </motion.h3>
    <motion.p className="mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.2 + 0.3 }}>
      {description}
    </motion.p>
    <div className="flex flex-wrap">
      {technologies.map((tech, techIndex) => (
        <motion.span
          key={techIndex}
          className="bg-lightest-navy text-green rounded-full px-3 py-1 text-sm mr-2 mb-2"
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 + 0.5 + techIndex * 0.1 }}
        >
          {tech}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

const Experience = () => {
  const jobs = [
    {
      date: "2022 — PRESENT",
      title: "Senior Frontend Engineer",
      company: "TechNova Solutions",
      description: "Leading the development of next-generation web applications, focusing on performance optimization and accessibility. Mentoring junior developers and driving the adoption of best practices across the team.",
      technologies: ["React", "TypeScript", "GraphQL", "Next.js"]
    },
    {
      date: "2019 — 2022",
      title: "Frontend Developer",
      company: "InnovateTech",
      description: "Developed and maintained complex web applications for a diverse client base. Implemented responsive designs and ensured cross-browser compatibility. Collaborated closely with UX/UI designers to bring creative concepts to life.",
      technologies: ["Vue.js", "Nuxt.js", "SASS", "Jest"]
    },
    {
      date: "2017 — 2019",
      title: "Web Developer",
      company: "DigitalCraft Agency",
      description: "Created custom WordPress themes and plugins for small to medium-sized businesses. Optimized website performance and implemented SEO best practices. Provided technical support and training to clients.",
      technologies: ["WordPress", "PHP", "jQuery", "MySQL"]
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-8 text-lightest-slate"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Where I've Worked
      </motion.h2>
      {jobs.map((job, index) => (
        <JobEntry key={index} {...job} index={index} />
      ))}
    </div>
  );
};

export default Experience;