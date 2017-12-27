import React from 'react';
import PropTypes from 'prop-types';
import MaterialDrawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';

const Drawer = ({ isOpened, onDrawerClick }) => (
  <MaterialDrawer open={isOpened} onClose={onDrawerClick}>
    <List
      tabIndex={0}
      role="button"
      onClick={onDrawerClick}
      onKeyDown={onDrawerClick}
    >
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox1" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox2" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox3" />
      </ListItem>
    </List>
  </MaterialDrawer>
);

Drawer.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onDrawerClick: PropTypes.func.isRequired
};

export default Drawer;
