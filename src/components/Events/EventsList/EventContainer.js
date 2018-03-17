import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Event from './Event';

const mapDispatchToProps = (dispatch, { event: { eventKey } }) => ({
  onClick: () => {
    dispatch(push(`/event/${eventKey}`));
  }
});

export default connect(null, mapDispatchToProps)(Event);
