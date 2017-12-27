import { connect } from 'react-redux';

import AppBar from 'components/AppBar';

import { toggleDrawer } from 'actions/ui';
import { USER_STATE_CONNECTED } from 'reducers/user';

const mapStateToProps = ({ plannerApp: { user: { state } } }) => ({
  isConnected: state === USER_STATE_CONNECTED
});

const mapDispatchToPros = dispatch => ({
  onMenuClick: () => {
    dispatch(toggleDrawer());
  }
});

export default connect(mapStateToProps, mapDispatchToPros)(AppBar);
