import React from 'react';
import { connect } from 'react-redux';

import { isConnectedSelector, isConnectingSelector } from 'store/selectors/user';

const mapStateToProps = state => ({
  isConnecting: isConnectingSelector(state),
  isConnected: isConnectedSelector(state)
});

const WaitForLogin = Comp => connect(mapStateToProps)((props) => {
  const {
    isConnected,
    isConnecting
  } = props;

  if (isConnected) {
    return <Comp {...props} />;
  } else if (isConnecting) {
    return <h1>Connecting</h1>;
  }
  return <h1>Not connected</h1>;
});

export default WaitForLogin;
