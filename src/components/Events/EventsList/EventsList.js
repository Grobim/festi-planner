import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

const styles = {
  layout: {}
};

const EventsList = ({
  events,
  classes
}) => (
  <div className={classes.layout}>
    Coucou EventsList
    <pre>{JSON.stringify(events, null, 2)}</pre>
  </div>
);

EventsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withStyles(styles)(EventsList);
