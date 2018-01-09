import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import MaterialSnackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

const DefaultSnackbar = ({
  classes,
  actions,
  message,
  autoHideDuration,
  ...props
}) => {
  const {
    onClose
  } = props;

  const actionArray = (actions)
    ? [...actions]
    : (
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        className={classes.close}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    );

  return (
    <MaterialSnackbar
      SnackbarContentProps={{
        'aria-describedby': 'snackbar-message-id',
      }}
      message={
        <span id="snackbar-message-id">{message}</span>
      }
      autoHideDuration={autoHideDuration}
      action={actionArray}
      {...props}
    />
  );
};

DefaultSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  autoHideDuration: PropTypes.number,
  actions: PropTypes.arrayOf(PropTypes.element)
};

DefaultSnackbar.defaultProps = {
  message: '',
  actions: null,
  autoHideDuration: 4000
};

export default withStyles(styles)(DefaultSnackbar);
