import { connect } from 'react-redux';

import Event from 'components/Event';

import {
  syncEvent,
  unsyncEvent,
  saveEvent
} from 'actions/event';

const mapStateToProps = ({
  plannerApp: {
    event
  }
}, {
  params: { eventId }
}) => ({
  eventId,
  event: event[eventId]
});

const mapDispatchToProps = dispatch => ({
  syncEvent: (eventId) => {
    dispatch(syncEvent(eventId));
  },
  unsyncEvent: (eventId) => {
    dispatch(unsyncEvent(eventId));
  },
  save: (eventId, eventData) => {
    dispatch(saveEvent(eventId, eventData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
