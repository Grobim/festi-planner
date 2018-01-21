import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { CircularProgress } from 'material-ui/Progress';

import AddIcon from 'material-ui-icons/Add';

import Fab from 'components/Fab';

import EventsList from './EventsList';

const styles = theme => ({
  layout: {
    padding: theme.spacing.unit,
    flex: 1
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

const Events = ({
  isLoading,
  classes,
  events,
  onFabClick
}) => (
  <div className={classes.layout}>
    {isLoading ? (
      <CircularProgress size={70} />
    ) : (
      <EventsList events={events} />
    )}
    <Fab
      color="primary"
      content={<AddIcon />}
      onClick={onFabClick}
    />
  </div>
);

Events.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  events: PropTypes.arrayOf(PropTypes.any),
  onFabClick: PropTypes.func.isRequired
};

Events.defaultProps = {
  events: []
};

export default withStyles(styles)(Events);
