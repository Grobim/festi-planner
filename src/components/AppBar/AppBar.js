import React from 'react';
import PropTypes from 'prop-types';

import MaterialAppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import './AppBar.css';

const AppBar = ({ onMenuClick }) => (
  <MaterialAppBar position="static">
    <Toolbar>
      <IconButton onClick={onMenuClick} className="AppBar-menu" color="contrast" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <Typography type="title" color="inherit">
        FckNyE - Planner
      </Typography>
    </Toolbar>
  </MaterialAppBar>
);

AppBar.propTypes = {
  onMenuClick: PropTypes.func.isRequired
};

export default AppBar;
