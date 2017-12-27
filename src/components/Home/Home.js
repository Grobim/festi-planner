import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ connect, disconnect }) => (
  <div>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <button onClick={connect}>Connect</button>
    <button onClick={disconnect}>Disconnect</button>
  </div>
);

Home.propTypes = {
  connect: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired
};

export default Home;
