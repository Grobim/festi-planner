import React from 'react';
import PropTypes from 'prop-types';
import MaterialDrawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import EventIcon from 'material-ui-icons/Event';

const Drawer = ({
  isOpened,
  onDrawerClick,
  goTo
}) => (
  <MaterialDrawer open={isOpened} onClose={onDrawerClick}>
    <List
      tabIndex={0}
      role="button"
      onClick={onDrawerClick}
      onKeyDown={onDrawerClick}
    >
      <ListItem
        role="navigation"
        href="/events"
        onClick={goTo('/events')}
      >
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Events" />
      </ListItem>
    </List>
  </MaterialDrawer>
);

Drawer.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onDrawerClick: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired
};

export default Drawer;
