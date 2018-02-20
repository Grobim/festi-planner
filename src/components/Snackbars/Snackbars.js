import React, { Fragment } from 'react';

import DefaultSnackbar from 'containers/Snackbars/DefaultSnackbar';
import ErrorSnackbar from 'containers/Snackbars/ErrorSnackbar';
import ReloadSnackbar from 'containers/Snackbars/ReloadSnackbar';
import LoginSnackbar from 'containers/Snackbars/LoginSnackbar';

const Snackbars = () => (
  <Fragment>
    <DefaultSnackbar />
    <ErrorSnackbar />
    <ReloadSnackbar />
    <LoginSnackbar />
  </Fragment>
);

export default Snackbars;
