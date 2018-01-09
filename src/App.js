import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { withStyles } from 'material-ui/styles';

import { listenToAuth } from 'actions/user';

import AppBar from 'containers/AppBar';
import Drawer from 'containers/Drawer';
import Snackbars from 'components/Snackbars';

const styles = {
  content: {
    paddingTop: 74,
    minHeight: 'calc(100% - 74px)',
    display: 'flex'
  }
};

const mapDispatchToProps = dispatch => ({
  listenToAuth: (getLocation) => {
    dispatch(listenToAuth(getLocation));
  }
});

class App extends Component {
  componentDidMount() {
    this.props.listenToAuth(this.props.router.getCurrentLocation);
  }

  render() {
    return (
      <Fragment>
        <AppBar />
        <Drawer />
        <div className={this.props.classes.content}>
          {this.props.children}
        </div>
        <Snackbars />
      </Fragment>
    );
  }
}

App.propTypes = {
  router: PropTypes.objectOf(PropTypes.any).isRequired,
  listenToAuth: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(withRouter(App)));
