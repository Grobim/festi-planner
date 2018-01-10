import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { CircularProgress } from 'material-ui/Progress';

import EventsFilter from './EventsFilter';
import EventsList from './EventsList';
import EventsPagination from './EventsPagination';

const styles = theme => ({
  layout: {
    padding: theme.spacing.unit,
    flex: 1
  }
});

const Events = ({
  isLoading,
  classes,
  events
}) => (
  <div className={classes.layout}>
    <EventsFilter />
    {isLoading && <div><CircularProgress size={70} /></div>}
    {!isLoading && (
      <Fragment>
        <EventsList events={events} />
        <EventsPagination />
      </Fragment>
    )}
  </div>
);

Events.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  events: PropTypes.arrayOf(PropTypes.any)
};

Events.defaultProps = {
  events: []
};

export default withStyles(styles)(Events);
