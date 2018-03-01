import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import AppBar from 'components/AppBar';

import { toggleDrawer, showLogin } from 'actions/ui/global';
import { USER_STATE_CONNECTED } from 'reducers/user';
import { disconnect } from 'actions/user';
import {
  stateSelector,
  photoUrlSelector,
  uidSelector
} from 'store/selectors/user';

const mapStateToProps = state => ({
  isConnected: stateSelector(state) === USER_STATE_CONNECTED,
  photoURL: photoUrlSelector(state),
  uid: uidSelector(state)
});

const mapDispatchToPros = dispatch => ({
  onMenuClick: () => {
    dispatch(toggleDrawer());
  },
  login: () => {
    dispatch(showLogin());
  },
  goToProfile: (uid) => {
    dispatch(push(`/profile/${uid}`));
  },
  disconnect: () => {
    dispatch(disconnect());
  }
});

export default connect(mapStateToProps, mapDispatchToPros)(AppBar);
