import React from 'react';
import PropTypes from 'prop-types';

import { Router, Route, IndexRoute } from 'react-router';

import Loadable from 'react-loadable';
import Loader from 'components/Loader';

import Home from 'containers/Home';
import App from './App';

const asyncLoadTimeout = 3000;

const AsyncLogin = Loadable({
  loader: () => import('containers/Login'),
  loading: Loader,
  timeout: asyncLoadTimeout
});

const AsyncProfile = Loadable({
  loader: () => import('containers/Profile'),
  loading: Loader,
  timeout: asyncLoadTimeout
});

const AsyncEvents = Loadable({
  loader: () => import('containers/Events'),
  loading: Loader,
  timeout: asyncLoadTimeout
});

const AsyncNewEvent = Loadable({
  loader: () => import('containers/NewEvent'),
  loading: Loader,
  timeout: asyncLoadTimeout
});

const Routes = ({ history }) => (
  <Router history={history}>
    <Route path="/" exact component={App}>
      <IndexRoute component={Home} />
      <Route path="login" exact component={AsyncLogin} />
      <Route path="events" exact component={AsyncEvents} />
      <Route path="event/new" exact component={AsyncNewEvent} />
      <Route path="profile/:uid" exact component={AsyncProfile} />
    </Route>
  </Router>
);

Routes.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Routes;
