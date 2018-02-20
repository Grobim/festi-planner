import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

const styles = {
  layout: {
    margin: 'auto',
    textAlign: 'center'
  },
  waiting: {
    fontStyle: 'italic'
  }
};

const Loader = ({
  isLoading,
  pastDelay,
  timedOut,
  error,
  classes
}) => {
  let content;

  if (isLoading && pastDelay) {
    content = (
      <Fragment>
        <CircularProgress size={70} />
        {timedOut && (
          <Typography className={classes.waiting} variant="title">It&apos;s taking long... still loading...</Typography>
        )}
      </Fragment>
    );
  } else if (error) {
    content = <Typography color="error" variant="title">Sorry, there was a problem loading the page.</Typography>;
  }

  if (content) {
    return (
      <div className={classes.layout}>
        {content}
      </div>
    );
  }

  return null;
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  pastDelay: PropTypes.bool.isRequired,
  timedOut: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.any),
  classes: PropTypes.objectOf(PropTypes.any).isRequired
};

Loader.defaultProps = {
  error: false
};

export default withStyles(styles)(Loader);
