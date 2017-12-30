import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import AppBar from 'components/AppBar';

import { toggleDrawer } from 'actions/ui/global';
import { USER_STATE_CONNECTED } from 'reducers/user';
import { disconnect } from 'actions/user';

const mapStateToProps = ({
  plannerApp: { user: { state, photoURL, uid } }
}) => ({
  isConnected: state === USER_STATE_CONNECTED,
  photoURL,
  uid
});

const mapDispatchToPros = dispatch => ({
  onMenuClick: () => {
    dispatch(toggleDrawer());
  },
  goToProfile: (uid) => {
    dispatch(push(`/profile/${uid}`));
  },
  disconnect: () => {
    dispatch(disconnect());
  }
});

export default connect(mapStateToProps, mapDispatchToPros)(AppBar);
