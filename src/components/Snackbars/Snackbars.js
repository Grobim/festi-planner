import React, { Fragment } from 'react';

import DefaultSnackbar from 'containers/Snackbars/DefaultSnackbar';
import ReloadSnackbar from 'containers/Snackbars/ReloadSnackbar';

const Snackbars = () => (
  <Fragment>
    <DefaultSnackbar />
    <ReloadSnackbar />
  </Fragment>
);

export default Snackbars;
