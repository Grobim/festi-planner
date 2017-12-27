import { connect } from 'react-redux';

import Drawer from 'components/Drawer';

import { toggleDrawer } from 'actions/ui';

const mapStateToProps = ({ plannerApp: { ui: { drawerOpened } } }) => ({
  isOpened: drawerOpened
});

const mapDispatchToProps = dispatch => ({
  onDrawerClick: () => {
    dispatch(toggleDrawer());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
