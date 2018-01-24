import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

import Reboot from 'material-ui/Reboot';

import { listenToAuth } from 'actions/user';

import AppBar from 'containers/AppBar';
import Drawer from 'containers/Drawer';
import Snackbars from 'components/Snackbars';
import Modals from 'components/Modals';

const styles = {
  content: {
    paddingTop: 74,
    minHeight: 'calc(100% - 74px)',
    display: 'flex'
  }
};

const mapDispatchToProps = dispatch => ({
  listenToAuth: () => {
    dispatch(listenToAuth());
  }
});

class App extends Component {
  componentDidMount() {
    this.props.listenToAuth();
  }

  render() {
    return (
      <Fragment>
        <Reboot />
        <AppBar />
        <Drawer />
        <div className={this.props.classes.content}>
          {this.props.children}
        </div>
        <Snackbars />
        <Modals />
      </Fragment>
    );
  }
}

App.propTypes = {
  listenToAuth: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(App));
