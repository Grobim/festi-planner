import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { listenToAuth } from 'actions/user';

import AppBar from 'containers/AppBar';
import Drawer from 'containers/Drawer';

import Routes from './Routes';

import './App.css';

const mapDispatchToProps = dispatch => ({
  listenToAuth: () => {
    dispatch(listenToAuth());
  }
});

class App extends Component {
  componentDidMount() {
    this.props.listenToAuth();
  }

  render() {
    return (
      <div className="App">
        <AppBar />
        <Drawer />
        <Routes />
      </div>
    );
  }
}

App.propTypes = {
  listenToAuth: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(App);
