import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendUserData } from '../services/api';

const CreatePortfolio = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    about: '',
    experience: [{ date: '', title: '', company: '', description: '', technologies: [] }],
    projects: [{ title: '', description: '', link: '', technologies: [], stars: 0 }],
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: '',
      codepen: ''
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e, index, field) => {
    if (field === 'experience' || field === 'projects') {
      const updatedData = [...formData[field]];
      updatedData[index][e.target.name] = e.target.value;
      setFormData({ ...formData, [field]: updatedData });
    } else if (field === 'socialLinks') {
      setFormData({
        ...formData,
        socialLinks: { ...formData.socialLinks, [e.target.name]: e.target.value }
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleAddItem = (field) => {
    if (field === 'experience') {
      setFormData({
        ...formData,
        experience: [...formData.experience, { date: '', title: '', company: '', description: '', technologies: [] }]
      });
    } else if (field === 'projects') {
      setFormData({
        ...formData,
        projects: [...formData.projects, { title: '', description: '', link: '', technologies: [], stars: 0 }]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await sendUserData(formData);
      setDownloadUrl("http://localhost:7222" + response.downloadUrl);
    } catch (err) {
      setError('An error occurred while processing your request. Please try again.');
    }
    setIsLoading(false);
  };

  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "Why did the developer go broke? Because he used up all his cache!",
    "Why do Java developers wear glasses? Because they don't C#!",
    "What's a programmer's favorite hangout spot? Foo Bar!",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25!"
  ];

  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-3xl font-bold mb-8 text-light-text dark:text-lightest-slate"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Create Your Portfolio
      </motion.h2>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          >
            <div className="bg-white dark:bg-navy p-8 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-2xl font-bold mb-4 text-light-text dark:text-lightest-slate">Building Your Site...</h3>
              <p className="mb-4 text-light-text dark:text-slate">Meanwhile, here's a programmer joke for you:</p>
              <p className="italic text-light-primary dark:text-green">{randomJoke}</p>
              <div className="mt-6 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-primary dark:border-green"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!downloadUrl ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-light-text dark:text-lightest-slate">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-light-text dark:text-lightest-slate">Professional Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-light-text dark:text-lightest-slate">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-light-text dark:text-lightest-slate">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-light-text dark:text-lightest-slate">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="about" className="block text-sm font-medium text-light-text dark:text-lightest-slate">About Me</label>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text dark:text-lightest-slate mb-2">Experience</label>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-4 p-4 border rounded-md dark:border-gray-700">
                <input
                  type="text"
                  name="date"
                  placeholder="Date"
                  value={exp.date}
                  onChange={(e) => handleChange(e, index, 'experience')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white mb-2"
                />
                <input
                  type="text"
                  name="title"
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={(e) => handleChange(e, index, 'experience')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white mb-2"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleChange(e, index, 'experience')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white mb-2"
                />
                <textarea
                  name="description"
                  placeholder="Job Description"
                  value={exp.description}
                  onChange={(e) => handleChange(e, index, 'experience')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white mb-2"
                />
                <input
                  type="text"
                  name="technologies"
                  placeholder="Technologies (comma-separated)"
                  value={exp.technologies.join(',')}
                  onChange={(e) => handleChange({ target: { name: 'technologies', value: e.target.value.split(',') } }, index, 'experience')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white"
                />
              </div>
            ))}
            <button type="button" onClick={() => handleAddItem('experience')} className="mt-2 text-light-primary dark:text-green">+ Add Experience</button>
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text dark:text-lightest-slate mb-2">Projects</label>
            {formData.projects.map((project, index) => (
              <div key={index} className="mb-4 p-4 border rounded-md dark:border-gray-700">
                <input
                  type="text"
                  name="title"
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => handleChange(e, index, 'projects')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white mb-2"
                />
                <textarea
                  name="description"
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => handleChange(e, index, 'projects')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white mb-2"
                />
                <input
                  type="text"
                  name="link"
                  placeholder="Project Link"
                  value={project.link}
                  onChange={(e) => handleChange(e, index, 'projects')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white mb-2"
                />
                <input
                  type="text"
                  name="technologies"
                  placeholder="Technologies (comma-separated)"
                  value={project.technologies.join(',')}
                  onChange={(e) => handleChange({ target: { name: 'technologies', value: e.target.value.split(',') } }, index, 'projects')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white mb-2"
                />
                <input
                  type="number"
                  name="stars"
                  placeholder="Stars"
                  value={project.stars}
                  onChange={(e) => handleChange(e, index, 'projects')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white"
                />
              </div>
            ))}
            <button type="button" onClick={() => handleAddItem('projects')} className="mt-2 text-light-primary dark:text-green">+ Add Project</button>
          </div>

          <div>
            <label className="block text-sm font-medium text-light-text dark:text-lightest-slate mb-2">Social Links</label>
            {Object.keys(formData.socialLinks).map((platform) => (
              <div key={platform} className="mb-2">
                <label htmlFor={platform} className="block text-xs font-medium text-light-text dark:text-lightest-slate">{platform.charAt(0).toUpperCase() + platform.slice(1)}</label>
                <input
                  type="url"
                  id={platform}
                  name={platform}
                  value={formData.socialLinks[platform]}
                  onChange={(e) => handleChange(e, null, 'socialLinks')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white"
                  />
                </div>
              ))}
            </div>
  
            <div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-light-primary dark:text-green bg-transparent hover:bg-light-primary hover:text-white dark:hover:bg-green dark:hover:text-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary dark:focus:ring-green transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Create Portfolio'}
              </motion.button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-xl mb-4 text-light-text dark:text-lightest-slate">Your portfolio is ready!</p>
            <motion.a
              href={downloadUrl}
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-light-primary dark:text-green bg-transparent hover:bg-light-primary hover:text-white dark:hover:bg-green dark:hover:text-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary dark:focus:ring-green transition-colors duration-200"
            >
              Download Portfolio
            </motion.a>
          </div>
        )}
  
        {error && (
          <motion.p
            className="mt-4 text-red-600 dark:text-red-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  };
  
  export default CreatePortfolio;