import React from 'react';

const JobEntry = ({ date, title, company, description, technologies }) => (
  <div className="mb-8">
    <div className="text-gray-400">{date}</div>
    <h3 className="text-xl font-semibold mt-1">{title} · {company}</h3>
    <p className="mt-2">{description}</p>
    <div className="mt-2 flex flex-wrap">
      {technologies.map((tech, index) => (
        <span key={index} className="bg-gray-800 text-gray-300 rounded-full px-3 py-1 text-sm mr-2 mb-2">
          {tech}
        </span>
      ))}
    </div>
  </div>
);

const Experience = () => {
  const jobs = [
    {
      date: "2024 — PRESENT",
      title: "Senior Frontend Engineer, Accessibility",
      company: "Klaviyo",
      description: "Build and maintain critical components used to construct Klaviyo's frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
      technologies: ["JavaScript", "TypeScript", "React", "Storybook"]
    },
    {
      date: "2018 — 2024",
      title: "Lead Engineer",
      company: "Upstatement",
      description: "Built, style, and ship high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.",
      technologies: ["JavaScript", "TypeScript", "HTML & CSS", "React", "Next.js", "React Native", "WordPress", "Contentful", "Node.js", "PHP"]
    },
    // Add more job entries as needed
  ];

  return (
    <div>
      {jobs.map((job, index) => (
        <JobEntry key={index} {...job} />
      ))}
    </div>
  );
};

export default Experience;