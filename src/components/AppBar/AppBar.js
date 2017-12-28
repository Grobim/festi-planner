import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MaterialAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import { ListItemIcon, ListItemText } from 'material-ui/List';

import MenuIcon from 'material-ui-icons/Menu';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';

import Link from 'components/Link';

import './AppBar.css';

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
    this.handleMenuClose();
    this.props.goToProfile();
  }

  handleDisconnectClick = () => {
    this.handleMenuClose();
    this.props.disconnect();
  }

  render() {
    const {
      isConnected,
      onMenuClick
    } = this.props;

    return (
      <MaterialAppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={onMenuClick}
            className="AppBar-menu"
            color="contrast"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography className="AppBar-title" type="title" color="inherit">
            <Link href="/" to="/">
              FckNyE - Planner
            </Link>
          </Typography>
          {!isConnected && (
            <Link href="/login" to="/login">
              <Button color="contrast">Login</Button>
            </Link>
          )}
          {isConnected && (
            <div>
              <IconButton
                aria-owns={this.state.menuIsOpen ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenuOpen}
                color="contrast"
              >
                <AccountCircleIcon />
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
            </div>
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
  disconnect: PropTypes.func.isRequired
};

export default AppBar;
