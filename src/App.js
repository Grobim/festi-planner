import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connect as userConnect, disconnect, listenToAuth } from './actions';
import logo from './logo.svg';
import './App.css';

const mapDispatchToProps = dispatch => ({
  connect: () => {
    dispatch(userConnect());
  },
  disconnect: () => {
    dispatch(disconnect());
  },
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.props.connect}>Connect</button>
        <button onClick={this.props.disconnect}>Disconnect</button>
      </div>
    );
  }
}

App.propTypes = {
  connect: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired,
  listenToAuth: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(App);
