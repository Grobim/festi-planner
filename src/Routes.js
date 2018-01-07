import React from 'react';
import PropTypes from 'prop-types';

import { Router, Route, IndexRoute } from 'react-router';

import Loadable from 'react-loadable';
import Loader from 'components/Loader';

import Home from 'containers/Home';
import App from './App';

const AsyncLogin = Loadable({
  loader: () => import('containers/Login'),
  loading: Loader,
  timeout: 2000
});

const AsyncProfile = Loadable({
  loader: () => import('containers/Profile'),
  loading: Loader,
  timeout: 2000
});

const AsyncEvents = Loadable({
  loader: () => import('containers/Events'),
  loading: Loader,
  timeout: 2000
});

const Routes = ({ history }) => (
  <Router history={history}>
    <Route path="/" exact component={App}>
      <IndexRoute component={Home} />
      <Route path="login" exact component={AsyncLogin} />
      <Route path="events" exact component={AsyncEvents} />
      <Route path="profile/:uid" exact component={AsyncProfile} />
    </Route>
  </Router>
);

Routes.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Routes;
