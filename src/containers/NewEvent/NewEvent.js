import { connect } from 'react-redux';

import Event from 'components/Event';

const mapStateToProps = () => ({
  eventKey: 'NEW'
});

export default connect(mapStateToProps)(Event);
