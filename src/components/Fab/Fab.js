import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';

import Zoom from 'material-ui/transitions/Zoom';

import SnackbarSlide from './Transitions/SnackbarSlide';

const Fab = ({
  content,
  shouldSlideUp,
  classes,
  theme,
  dispatch,
  ...props
}) => {
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };

  return (
    <SnackbarSlide in={shouldSlideUp}>
      <Zoom
        appear
        in
        timeout={transitionDuration}
        unmountOnExit
      >
        <Button
          variant="fab"
          {...props}
        >
          {content}
        </Button>
      </Zoom>
    </SnackbarSlide>
  );
};

Fab.propTypes = {
  shouldSlideUp: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  content: PropTypes.element.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withStyles(null, { withTheme: true })(Fab);
