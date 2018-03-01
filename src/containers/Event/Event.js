import { connect } from 'react-redux';

import Event from 'components/Event';

import { USER_STATE_CONNECTED } from 'reducers/user';

import {
  syncEvent,
  unsyncEvent,
  saveEvent
} from 'actions/event';

import { showActionLoginMessage } from 'actions/ui/global';
import { eventPublicSelector } from 'store/selectors/event';
import { stateSelector } from 'store/selectors/user';

const mapStateToProps = (state, {
  params: { eventId }
}) => ({
  isConnected: stateSelector(state) === USER_STATE_CONNECTED,
  event: eventPublicSelector(state),
  eventId
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
