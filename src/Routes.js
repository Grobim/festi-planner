import React from 'react';
import PropTypes from 'prop-types';

import { Router, Route, IndexRoute } from 'react-router';

import Home from 'containers/Home';
import Login from 'containers/Login';
import Profile from 'containers/Profile';
import App from './App';

const Routes = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="profile/:uid" component={Profile} />
    </Route>
  </Router>
);

Routes.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Routes;
