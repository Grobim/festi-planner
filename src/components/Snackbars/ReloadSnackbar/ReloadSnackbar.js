import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import MaterialSnackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

const ReloadSnackbar = ({
  classes,
  ...props
}) => (
  <MaterialSnackbar
    SnackbarContentProps={{
      'aria-describedby': 'reload-snackbar-message-id',
    }}
    message={
      <span id="reload-snackbar-message-id">New content is available; please refresh.</span>
    }
    autoHideDuration={null}
    action={
      <Button
        key="undo"
        color="secondary"
        dense
        // eslint-disable-next-line no-restricted-globals
        onClick={() => { location.reload(); }}
      >
        Reload
      </Button>
    }
    {...props}
  />
);

ReloadSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  autoHideDuration: PropTypes.number
};

ReloadSnackbar.defaultProps = {
  autoHideDuration: null
};

export default withStyles(styles)(ReloadSnackbar);
