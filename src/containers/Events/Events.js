import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Events from 'components/Events';
import WaitForLogin from 'components/WaitForLogin';

import { syncEvents, unsyncEvents } from 'actions/events';
import { eventsDataSelector } from 'store/selectors/events';

const mapStateToProps = state => ({
  isLoading: !eventsDataSelector(state),
  events: eventsDataSelector(state)
});

const mapDispatchToProps = dispatch => ({
  syncEvents: () => {
    dispatch(syncEvents());
  },
  unsyncEvents: () => {
    dispatch(unsyncEvents());
  },
  onFabClick: () => {
    dispatch(push('/event/new'));
  }
});

class EventsContainer extends Component {
  componentDidMount() {
    this.props.syncEvents();
  }

  componentWillUnmount() {
    this.props.unsyncEvents();
  }

  render() {
    return <Events {...this.props} />;
  }
}

EventsContainer.propTypes = {
  syncEvents: PropTypes.func.isRequired,
  unsyncEvents: PropTypes.func.isRequired
};

const WaitForLoginEvents = WaitForLogin(EventsContainer);

export default connect(mapStateToProps, mapDispatchToProps)(WaitForLoginEvents);
