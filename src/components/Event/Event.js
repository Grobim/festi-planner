import React from 'react';
import PropTypes from 'prop-types';

const Event = ({
  eventKey
}) => (
  <div>Coucou {eventKey}</div>
);

Event.propTypes = {
  eventKey: PropTypes.string.isRequired
};

export default Event;
