import { connect } from 'react-redux';

import Event from 'components/Event';

import { USER_STATE_CONNECTED } from 'reducers/user';

import {
  syncEvent,
  unsyncEvent,
  saveEvent
} from 'actions/event';

import { showActionLoginMessage } from 'actions/ui/global';

const mapStateToProps = ({
  plannerApp: {
    event,
    user: {
      state
    }
  }
}, {
  params: { eventId }
}) => ({
  isConnected: state === USER_STATE_CONNECTED,
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
  },
  showLogin: () => {
    dispatch(showActionLoginMessage());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
