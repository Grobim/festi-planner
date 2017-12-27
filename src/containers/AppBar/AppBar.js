import { connect } from 'react-redux';

import AppBar from 'components/AppBar';

import { toggleDrawer } from 'actions/ui';

const mapDispatchToPros = dispatch => ({
  onMenuClick: () => {
    dispatch(toggleDrawer());
  }
});

export default connect(null, mapDispatchToPros)(AppBar);
