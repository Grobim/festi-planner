import React from 'react';
import PropTypes from 'prop-types';

const noop = () => {};

const Event = ({
  event,
  onClick,
  tabIndex,
  ...rest
}) => (
  <div onClick={onClick} role="button" tabIndex={tabIndex} onKeyPress={noop} {...rest}>
    <pre>{JSON.stringify(event, null, 2)}</pre>
  </div>
);

Event.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number
};

Event.defaultProps = {
  onClick: noop,
  tabIndex: undefined
};

export default Event;
