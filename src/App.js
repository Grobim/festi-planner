import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connect as userConnect } from './actions';
import logo from './logo.svg';
import './App.css';

const mapDispatchToProps = dispatch => ({
  connect: () => {
    dispatch(userConnect());
  }
});

class App extends Component {
  componentDidMount() {
    this.props.connect();
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
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);
