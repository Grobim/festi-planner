import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Drawer from 'components/Drawer';

import { toggleDrawer } from 'actions/ui/global';

import { push } from 'react-router-redux';

const mapStateToProps = ({ plannerApp: { ui: { global: { drawerOpened } } } }) => ({
  isOpened: drawerOpened
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
