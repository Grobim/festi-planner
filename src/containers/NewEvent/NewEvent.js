import { connect } from 'react-redux';

import Event from 'components/Event';

import { createEvent } from 'actions/event';

const mapDispatchToProps = dispatch => ({
  save: (_, eventData) => {
    dispatch(createEvent(eventData));
  }
});

export default connect(null, mapDispatchToProps)(Event);
