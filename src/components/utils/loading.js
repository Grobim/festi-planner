import React from 'react';
import PropTypes from 'prop-types';

import { CircularProgress } from 'material-ui/Progress';

// eslint-disable-next-line react/prop-types
const loadingHoc = (props, circularProps) => (Comp) => {
  const LoadingComponent = ({ loading: loadingProp }) => {
    if (loadingProp) {
      return <CircularProgress {...circularProps} />;
    }

    return <Comp {...props} />;
  };

  LoadingComponent.propTypes = {
    loading: PropTypes.bool
  };

  LoadingComponent.defaultProps = {
    loading: false
  };

  return LoadingComponent;
};

export default loadingHoc;
