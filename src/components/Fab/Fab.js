import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';

import Zoom from 'material-ui/transitions/Zoom';

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});

const Fab = ({
  content,
  classes,
  theme,
  ...props
}) => {
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };

  return (
    <Zoom
      appear
      in
      timeout={transitionDuration}
      unmountOnExit
    >
      <Button
        fab
        className={classes.fab}
        {...props}
      >
        {content}
      </Button>
    </Zoom>
  );
};

Fab.propTypes = {
  content: PropTypes.element.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withStyles(styles, { withTheme: true })(Fab);
