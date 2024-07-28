# Personal Portfolio Website

This project is a customizable personal portfolio website built with React. It showcases your professional information, work experience, and projects in a sleek, responsive design.

## Features

- Responsive design
- Dark mode
- Animated transitions and interactions
- Sections for About, Experience, and Projects
- Customizable content through a single configuration file

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/portfolio-website.git
   cd portfolio-website
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and visit `http://localhost:3000` to see your portfolio website.

## Customizing Your Portfolio

To customize the content of your portfolio, you'll need to modify the `USER_INFO` object in the `src/constants/userInfo.js` file. This file contains all the personal information, experience, and project details displayed on the website.

### Editing Your Information

Open `src/constants/userInfo.js` and update the following fields:

- `name`: Your full name
- `title`: Your professional title
- `email`: Your email address
- `phone`: Your phone number
- `location`: Your location
- `about`: A detailed description about yourself (supports multiple paragraphs)
- `experience`: An array of your work experiences
- `projects`: An array of your projects
- `socialLinks`: Your social media profile links

Example:

```javascript
export const USER_INFO = {
  name: "Your Name",
  title: "Your Professional Title",
  email: "your.email@example.com",
  phone: "+1 (123) 456-7890",
  location: "Your City, State/Country",
  about: "Your detailed bio goes here...",
  experience: [
    {
      date: "2020 — PRESENT",
      title: "Senior Developer",
      company: "Tech Company",
      description: "Description of your role and achievements",
      technologies: ["React", "Node.js", "AWS"]
    },
    // Add more experiences...
  ],
  projects: [
    {
      title: "Project Name",
      description: "Brief description of the project",
      link: "https://project-link.com",
      technologies: ["React", "Firebase", "Tailwind CSS"],
      stars: 100
    },
    // Add more projects...
  ],
  socialLinks: {
    github: "https://github.com/yourusername",
    linkedin: "https://www.linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    // Add more social links...
  }
};
```

## Building for Production

To create a production-ready build of your portfolio website, run:

```
npm run build
```

This will create a `build` directory with optimized and minified assets ready for deployment.

## Beta Feature: Create Portfolio

The Create Portfolio feature is currently in beta and not fully developed. When completed, this feature will allow users to generate a customized portfolio website by filling out a form with their personal information, experiences, and projects.

To access this feature (once it's fully implemented):

1. Navigate to the "CREATE PORTFOLIO" section in the navigation menu.
2. Fill out the form with your information.
3. Submit the form to generate your custom portfolio.
4. Download the generated portfolio files.

Please note that this feature is still under development and may not be fully functional.

## Contributing

Contributions to improve the portfolio template are welcome. Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).