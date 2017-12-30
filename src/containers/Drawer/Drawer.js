import { connect } from 'react-redux';

import Drawer from 'components/Drawer';

import { toggleDrawer } from 'actions/ui/global';

const mapStateToProps = ({ plannerApp: { ui: { global: { drawerOpened } } } }) => ({
  isOpened: drawerOpened
});

const mapDispatchToProps = dispatch => ({
  onDrawerClick: () => {
    dispatch(toggleDrawer());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
