import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

const noop = () => {};

const mapStateToProps = (state, {
  params: { eventId }
}) => ({
  isConnected: stateSelector(state) === USER_STATE_CONNECTED,
  event: eventPublicSelector(state, eventId),
  eventId
});

const mapDispatchToProps = (dispatch, { params: { eventId } }) => ({
  sync: () => {
    dispatch(syncEvent(eventId));
  },
  unsync: () => {
    dispatch(unsyncEvent(eventId));
  },
  save: (eventData) => {
    dispatch(saveEvent(eventId, eventData));
  },
  showLogin: () => {
    dispatch(showActionLoginMessage());
  }
});

class EventContainer extends Component {
  static propTypes = {
    eventId: PropTypes.string,
    sync: PropTypes.func,
    unsync: PropTypes.func
  };

  static defaultProps = {
    eventId: null,
    sync: noop,
    unsync: noop
  };

  componentDidMount() {
    const {
      sync,
      eventId
    } = this.props;

    sync(eventId);
  }

  componentWillReceiveProps(newProps) {
    const currentEventId = this.props.eventId;
    const newEventId = newProps.eventId;

    if (currentEventId !== newEventId) {
      const {
        sync,
        unsync
      } = this.props;

      sync(currentEventId);
      unsync(newEventId);
    }
  }

  componentWillUnmount() {
    const {
      unsync,
      eventId
    } = this.props;

    unsync(eventId);
  }

  render() {
    return <Event {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);
