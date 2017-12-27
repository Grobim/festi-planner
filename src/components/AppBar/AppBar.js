import React from 'react';
import PropTypes from 'prop-types';

import MaterialAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import MenuIcon from 'material-ui-icons/Menu';

import { Link } from 'react-router';

import './AppBar.css';

const AppBar = ({ isConnected, onMenuClick }) => (
  <MaterialAppBar position="static">
    <Toolbar>
      <IconButton onClick={onMenuClick} className="AppBar-menu" color="contrast" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <Typography className="AppBar-title" type="title" color="inherit">
        FckNyE - Planner
      </Typography>
      {!isConnected && (
        <Link href="/login" to="/login">
          <Button color="contrast">Login</Button>
        </Link>
      )}
    </Toolbar>
  </MaterialAppBar>
);

AppBar.propTypes = {
  isConnected: PropTypes.bool.isRequired,
  onMenuClick: PropTypes.func.isRequired
};

export default AppBar;
