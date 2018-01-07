import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  layout: {
    paddingBottom: theme.spacing.unit
  }
});

const EventsFilter = ({
  classes
}) => (
  <div className={classes.layout}>
    Coucou EventsFilter
  </div>
);

EventsFilter.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withStyles(styles)(EventsFilter);
