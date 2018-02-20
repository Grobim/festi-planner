import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

const LoginSnackbar = ({
  showLogin,
  classes,
  ...props
}) => {
  const {
    type,
    onClose
  } = props;
  let message;

  switch (type) {
    case 'action':
      message = 'You must be connected to do this.';
      break;
    default: {
      return null;
    }
  }

  const handleClose = () => {
    onClose();
    showLogin();
  };

  return (
    <Snackbar
      SnackbarContentProps={{
        'aria-describedby': 'login-snackbar-message-id',
      }}
      message={
        <span id="login-snackbar-message-id">{message}</span>
      }
      autoHideDuration={4000}
      action={
        <Button
          key="undo"
          color="inherit"
          size="small"
          onClick={handleClose}
        >
          Login
        </Button>
      }
      {...props}
    />
  );
};

LoginSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  type: PropTypes.string,
  showLogin: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired
};

LoginSnackbar.defaultProps = {
  type: null
};

export default withStyles(styles)(LoginSnackbar);
