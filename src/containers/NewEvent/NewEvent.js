import { connect } from 'react-redux';

import Event from 'components/Event';

import { createEvent } from 'actions/event';

const mapStateToProps = () => ({
  eventId: 'NEW'
});

const mapDispatchToProps = dispatch => ({
  save: (eventId, eventData) => {
    dispatch(createEvent(eventData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
