import React from 'react';
import PropTypes from 'prop-types';

const Event = ({ event }) => (
  <div>
    <pre>{JSON.stringify(event, null, 2)}</pre>
  </div>
);

Event.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Event;
