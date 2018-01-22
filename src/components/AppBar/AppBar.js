import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router';

import { withStyles } from 'material-ui/styles';

import MaterialAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import { ListItemIcon, ListItemText } from 'material-ui/List';

import MenuIcon from 'material-ui-icons/Menu';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';

import Link from 'components/Link';

const styles = {
  menu: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    flex: 1
  }
};

class AppBar extends Component {
  state = {
    menuIsOpen: false,
    anchorEl: null
  };

  handleMenuOpen = (event) => {
    this.setState({
      menuIsOpen: true,
      anchorEl: event.currentTarget
    });
  }

  handleMenuClose = () => {
    this.setState({
      menuIsOpen: false,
      anchorEl: null
    });
  }

  handleProfileClick = () => {
    const {
      goToProfile,
      uid
    } = this.props;

    this.handleMenuClose();
    goToProfile(uid);
  }

  handleDisconnectClick = () => {
    this.handleMenuClose();
    this.props.disconnect();
  }

  render() {
    const {
      isConnected,
      onMenuClick,
      photoURL,
      classes,
      location: {
        pathname,
        search,
        query,
        state
      }
    } = this.props;

    return (
      <MaterialAppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={onMenuClick}
            className={classes.menu}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} type="title" color="inherit">
            <Link href="/" to="/">
              FckNyE - Planner
            </Link>
          </Typography>
          {isConnected ? (
            <Fragment>
              <IconButton
                aria-owns={this.state.menuIsOpen ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenuOpen}
                color="inherit"
              >
                {photoURL ? (
                  <Avatar src={photoURL} />
                ) : (
                  <AccountCircleIcon />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={this.state.menuIsOpen}
                onClose={this.handleMenuClose}
              >
                <MenuItem onClick={this.handleProfileClick}>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Profile" />
                </MenuItem>
                <MenuItem onClick={this.handleDisconnectClick}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Disconnect" />
                </MenuItem>
              </Menu>
            </Fragment>
          ) : (
            <Link
              href="/login"
              to={{
                pathname: '/login',
                state: {
                  from: {
                    pathname,
                    search,
                    query,
                    state
                  }
                }
              }}
            >
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </MaterialAppBar>
    );
  }
}

AppBar.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  goToProfile: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  photoURL: PropTypes.string,
  uid: PropTypes.string
};

AppBar.defaultProps = {
  photoURL: undefined,
  uid: undefined
};

export default withStyles(styles)(withRouter(AppBar));
