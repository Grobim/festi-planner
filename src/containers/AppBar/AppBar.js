import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import AppBar from 'components/AppBar';

import { toggleDrawer } from 'actions/ui';
import { USER_STATE_CONNECTED } from 'reducers/user';
import { disconnect } from 'actions/user';

const mapStateToProps = ({ plannerApp: { user: { state } } }) => ({
  isConnected: state === USER_STATE_CONNECTED
});

const mapDispatchToPros = dispatch => ({
  onMenuClick: () => {
    dispatch(toggleDrawer());
  },
  goToProfile: () => {
    dispatch(push('/profile'));
  },
  disconnect: () => {
    dispatch(disconnect());
  }
});

export default connect(mapStateToProps, mapDispatchToPros)(AppBar);
