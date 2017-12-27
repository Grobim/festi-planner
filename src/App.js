import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { listenToAuth } from 'actions/user';

import AppBar from 'containers/AppBar';
import Drawer from 'containers/Drawer';

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
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  listenToAuth: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default connect(null, mapDispatchToProps)(App);
