import React from 'react';

const ProjectCard = ({ title, description, image, link, technologies }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-6">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">
        <a href={link} className="text-blue-400 hover:underline">{title}</a>
      </h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="flex flex-wrap">
        {technologies.map((tech, index) => (
          <span key={index} className="bg-gray-700 text-gray-300 rounded-full px-3 py-1 text-sm mr-2 mb-2">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Projects = () => {
  const projects = [
    {
      title: "Build a Spotify Connected App",
      description: "Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, Styled Components, and more.",
      image: "/api/placeholder/800/400",
      link: "#",
      technologies: ["React", "Express", "Spotify API", "Heroku"]
    },
    {
      title: "Spotify Profile",
      description: "Web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
      image: "/api/placeholder/800/400",
      link: "#",
      technologies: ["React", "Express", "Spotify API", "Heroku"]
    },
    {
      title: "Halcyon Theme",
      description: "Minimal dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more.",
      image: "/api/placeholder/800/400",
      link: "#",
      technologies: ["VS Code", "Sublime Text", "Atom"]
    },
    {
      title: "brittanychiang.com (v4)",
      description: "An old portfolio site built with Gatsby and hosted on Netlify.",
      image: "/api/placeholder/800/400",
      link: "#",
      technologies: ["Gatsby", "Styled Components", "Netlify"]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  );
};

export default Projects;