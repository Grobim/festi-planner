import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import loading from 'components/utils/loading';

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
}) => {
  const LoadingList = loading({ events }, { size: 70 })(EventsList);

  return (
    <Fragment>
      <div className={classes.layout}>
        <LoadingList loading={isLoading} />
      </div>
      <Fab
        color="primary"
        content={<AddIcon />}
        onClick={onFabClick}
      />
    </Fragment>
  );
};

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
