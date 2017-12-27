import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from 'containers/Home';

const Routes = () =>
  (
    <Router>
      <Route path="/" exact component={Home} />
    </Router>
  );

export default Routes;
