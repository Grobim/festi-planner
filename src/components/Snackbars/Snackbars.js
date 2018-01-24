import React, { Fragment } from 'react';

import DefaultSnackbar from 'containers/Snackbars/DefaultSnackbar';
import ReloadSnackbar from 'containers/Snackbars/ReloadSnackbar';
import LoginSnackbar from 'containers/Snackbars/LoginSnackbar';

const Snackbars = () => (
  <Fragment>
    <DefaultSnackbar />
    <ReloadSnackbar />
    <LoginSnackbar />
  </Fragment>
);

export default Snackbars;
