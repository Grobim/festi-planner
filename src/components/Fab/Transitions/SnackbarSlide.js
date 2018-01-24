import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Transition from 'react-transition-group/Transition';

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});

const SnackbarSlide = ({
  in: inProp,
  classes,
  theme,
  children
}) => {
  const transitionStyles = {
    entering: {
      marginBottom: 0,
      transition: `margin-bottom ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.easeOut}`
    },
    entered: {
      marginBottom: 48,
      transition: `margin-bottom ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.easeOut}`
    },
    exiting: {
      marginBottom: 48,
      transition: `margin-bottom ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.sharp}`
    },
    exited: {
      marginBottom: 0,
      transition: `margin-bottom ${theme.transitions.duration.enteringScreen}ms ${theme.transitions.easing.sharp}`
    }
  };

  return (
    <Transition
      in={inProp}
      timeout={0}
    >
      {state => (
        <div
          className={classes.fab}
          style={transitionStyles[state]}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};

SnackbarSlide.propTypes = {
  in: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withStyles(styles, { withTheme: true })(SnackbarSlide);
