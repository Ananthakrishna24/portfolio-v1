import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sendUserData } from '../services/api';

const Download = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    about: '',
    experience: [{ date: '', title: '', company: '', description: '', technologies: [] }],
    projects: [{ title: '', description: '', link: '', technologies: [], stars: 0 }]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e, index, field) => {
    if (field === 'experience' || field === 'projects') {
      const updatedData = [...formData[field]];
      updatedData[index][e.target.name] = e.target.value;
      setFormData({ ...formData, [field]: updatedData });
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
      setDownloadUrl(response.downloadUrl);
    } catch (err) {
      setError('An error occurred while processing your request. Please try again.');
    }
    setIsLoading(false);
  };

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
            <label className="block text-sm font-medium text-light-text dark:text-lightest-slate">Experience</label>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mt-2 p-4 border rounded-md">
                <input
                  type="text"
                  name="date"
                  placeholder="Date"
                  value={exp.date}
                  onChange={(e) => handleChange(e, index, 'experience')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  name="title"
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={(e) => handleChange(e, index, 'experience')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleChange(e, index, 'experience')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white"
                />
                <textarea
                  name="description"
                  placeholder="Job Description"
                  value={exp.description}
                  onChange={(e) => handleChange(e, index, 'experience')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white"
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
            <label className="block text-sm font-medium text-light-text dark:text-lightest-slate">Projects</label>
            {formData.projects.map((project, index) => (
              <div key={index} className="mt-2 p-4 border rounded-md">
                <input
                  type="text"
                  name="title"
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => handleChange(e, index, 'projects')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white"
                />
                <textarea
                  name="description"
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => handleChange(e, index, 'projects')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  name="link"
                  placeholder="Project Link"
                  value={project.link}
                  onChange={(e) => handleChange(e, index, 'projects')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white"
                />
                <input
                  type="text"
                  name="technologies"
                  placeholder="Technologies (comma-separated)"
                  value={project.technologies.join(',')}
                  onChange={(e) => handleChange({ target: { name: 'technologies', value: e.target.value.split(',') } }, index, 'projects')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-light-primary focus:ring-light-primary dark:bg-lightest-navy dark:border-gray-700 dark:text-white"
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
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-light-primary hover:bg-light-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary dark:bg-green dark:hover:bg-green-dark"
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
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-light-primary hover:bg-light-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary dark:bg-green dark:hover:bg-green-dark"
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

export default Download;