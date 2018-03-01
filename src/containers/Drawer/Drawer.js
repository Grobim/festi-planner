import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { push } from 'react-router-redux';

import Drawer from 'components/Drawer';

import { toggleDrawer } from 'actions/ui/global';
import { drawerOpenedSelector } from 'store/selectors/ui/global';

const mapStateToProps = state => ({
  isOpened: drawerOpenedSelector(state)
});

const mapDispatchToProps = dispatch => ({
  onDrawerClick: () => {
    dispatch(toggleDrawer());
  },
  goTo: to => () => {
    dispatch(push(to));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Drawer));
