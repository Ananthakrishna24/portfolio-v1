import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';


function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={About} />
          <Route path="/experience" component={Experience} />
          <Route path="/projects" component={Projects} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;