import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Event from './EventContainer';

const styles = {
  layout: {
    flexGrow: 1
  }
};

const EventsList = ({
  events,
  classes
}) => (
  <div className={classes.layout}>
    Coucou EventsList
    {
      events.map((event, index) => <Event event={event} key={event.eventKey} tabIndex={index} />)
    }
  </div>
);

EventsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withStyles(styles)(EventsList);
