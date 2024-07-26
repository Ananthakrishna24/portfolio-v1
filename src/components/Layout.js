import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-navy text-slate">
      <header className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-lightest-slate">Brittany Chiang</h1>
          <p className="text-2xl mt-2 text-green">Senior Frontend Engineer</p>
          <p className="mt-4 text-slate max-w-xl">I build pixel-perfect, engaging, and accessible digital experiences.</p>
        </div>
      </header>
      <nav className="py-4 mb-8 font-mono text-sm">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-8">
            <li><Link to="/" className="text-lightest-slate hover:text-green transition duration-300">ABOUT</Link></li>
            <li><Link to="/experience" className="text-lightest-slate hover:text-green transition duration-300">EXPERIENCE</Link></li>
            <li><Link to="/projects" className="text-lightest-slate hover:text-green transition duration-300">PROJECTS</Link></li>
          </ul>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <TransitionGroup>
          <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
            {children}
          </CSSTransition>
        </TransitionGroup>
      </main>
      <footer className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4">
            <a href="#" className="text-lightest-slate hover:text-green transition duration-300"><i className="fab fa-github"></i></a>
            <a href="#" className="text-lightest-slate hover:text-green transition duration-300"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="text-lightest-slate hover:text-green transition duration-300"><i className="fab fa-codepen"></i></a>
            <a href="#" className="text-lightest-slate hover:text-green transition duration-300"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-lightest-slate hover:text-green transition duration-300"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-lightest-slate hover:text-green transition duration-300"><i className="fas fa-folder"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;