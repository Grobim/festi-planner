import { connect } from 'react-redux';

import Event from 'components/Event';

const mapStateToProps = (state, {
  params: { eventId }
}) => ({
  eventId
});

const mapDispatchToProps = () => ({
  syncEvent: (eventId) => {
    console.log('syncEvent', eventId);
  },
  save: () => {
    console.log('save');
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
