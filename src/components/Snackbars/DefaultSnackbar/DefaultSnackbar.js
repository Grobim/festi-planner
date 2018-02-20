import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Snackbar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';
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
  color,
  actionColor,
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
        color={actionColor}
        className={classes.close}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    );

  return (
    <Snackbar
      SnackbarContentProps={{
        'aria-describedby': 'snackbar-message-id',
      }}
      message={
        <Typography
          id="snackbar-message-id"
          color={color}
          component="span"
        >
          {message}
        </Typography>
      }
      action={actionArray}
      {...props}
    />
  );
};

DefaultSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string,
  color: PropTypes.string,
  actionColor: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  autoHideDuration: PropTypes.number,
  actions: PropTypes.arrayOf(PropTypes.element)
};

DefaultSnackbar.defaultProps = {
  message: '',
  color: 'inherit',
  actionColor: 'inherit',
  actions: null,
  autoHideDuration: 4000
};

export default withStyles(styles)(DefaultSnackbar);
