import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Events from 'components/Events';
import WaitForLogin from 'components/WaitForLogin';

import { fetchEvents } from 'actions/events';
import { eventsDataSelector } from 'store/selectors/events';

const mapStateToProps = state => ({
  isLoading: !eventsDataSelector(state),
  events: eventsDataSelector(state)
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => {
    dispatch(fetchEvents());
  },
  onFabClick: () => {
    dispatch(push('/event/new'));
  }
});

class EventsContainer extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    return <Events {...this.props} />;
  }
}

EventsContainer.propTypes = {
  fetchEvents: PropTypes.func.isRequired
};

const WaitForLoginEvents = WaitForLogin(EventsContainer);

export default connect(mapStateToProps, mapDispatchToProps)(WaitForLoginEvents);
