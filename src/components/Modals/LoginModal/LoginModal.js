import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

import CloseIcon from 'material-ui-icons/Close';

import Slide from 'material-ui/transitions/Slide';

import Loadable from 'react-loadable';
import Loader from 'components/Loader';

const asyncLoadTimeout = 3000;

const AsyncLogin = Loadable({
  loader: () => import('containers/Login'),
  loading: Loader,
  timeout: asyncLoadTimeout
});

const Transition = props => (
  <Slide direction="down" {...props} />
);

const styles = () => ({
  flex: {
    flex: 1,
    marginLeft: 56
  },
  layout: {
    display: 'flex',
    paddingTop: 74,
    minHeight: 'calc(100% - 74px)'
  }
});

class LoginModal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    closeLogin: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.any).isRequired
  };

  state = {
    open: false,
    transitionOpen: true
  };

  componentWillReceiveProps(newProps) {
    const {
      open
    } = this.props;

    const {
      open: newOpen
    } = newProps;

    if (!open && newOpen) {
      this.setState({
        open: true,
        transitionOpen: true
      });
    } else if (open && !newOpen) {
      this.setState({
        transitionOpen: false
      });
    }
  }

  render() {
    const {
      classes,
      closeLogin
    } = this.props;

    const {
      open,
      transitionOpen,
    } = this.state;

    return (
      <Fragment>
        {open ? (
          <Dialog
            fullScreen
            open={transitionOpen}
            onClose={closeLogin}
            transition={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  Login
                </Typography>
                <IconButton color="inherit" onClick={closeLogin} aria-label="Close">
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <div className={classes.layout}>
              <AsyncLogin />
            </div>
          </Dialog>
        ) : null}
      </Fragment>
    );
  }
}

export default withStyles(styles)(LoginModal);
