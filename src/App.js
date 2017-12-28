import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { listenToAuth } from 'actions/user';

import AppBar from 'containers/AppBar';
import Drawer from 'containers/Drawer';

import './App.css';

const mapDispatchToProps = dispatch => ({
  listenToAuth: (getLocation) => {
    dispatch(listenToAuth(getLocation));
  }
});

class App extends Component {
  componentDidMount() {
    this.props.listenToAuth(this.props.router.getCurrentLocation);
  }

  render() {
    return (
      <div>
        <AppBar />
        <Drawer />
        <div className="App-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  router: PropTypes.objectOf(PropTypes.any).isRequired,
  listenToAuth: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default connect(null, mapDispatchToProps)(withRouter(App));
