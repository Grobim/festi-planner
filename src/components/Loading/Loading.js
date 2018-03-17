import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { CircularProgress } from 'material-ui/Progress';

const Loading = ({ loading, children, loaderProps }) => {
  if (loading) {
    return <CircularProgress {...loaderProps} />;
  }

  return <Fragment>{children}</Fragment>;
};

Loading.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  loaderProps: PropTypes.objectOf(PropTypes.any)
};

Loading.defaultProps = {
  loading: false,
  loaderProps: {}
};

export default Loading;
