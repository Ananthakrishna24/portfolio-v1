import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from './components/Layout';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';

const BackgroundAnimation = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="small-grid"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <motion.path
          d="M 20 0 L 0 0 0 20"
          fill="none"
          stroke="rgba(100, 255, 218, 0.05)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#small-grid)" />
  </svg>
);

function App() {
  return (
    <Router>
      <div className="relative overflow-hidden">
        <BackgroundAnimation />
        <Layout>
          <Switch>
            <Route exact path="/" component={About} />
            <Route path="/experience" component={Experience} />
            <Route path="/projects" component={Projects} />
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}

export default App;