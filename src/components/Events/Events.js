import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { CircularProgress } from 'material-ui/Progress';

import AddIcon from 'material-ui-icons/Add';

import Fab from 'containers/Fab';

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
  <Fragment>
    <div className={classes.layout}>
      {isLoading ? (
        <CircularProgress size={70} />
      ) : (
        <EventsList events={events} />
      )}
    </div>
    <Fab
      color="primary"
      content={<AddIcon />}
      onClick={onFabClick}
    />
  </Fragment>
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
