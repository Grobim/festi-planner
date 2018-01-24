import { connect } from 'react-redux';

import Event from 'components/Event';

import { createEvent } from 'actions/event';
import { showActionLoginMessage } from 'actions/ui/global';

import { USER_STATE_CONNECTED } from 'reducers/user';

const mapStateToProps = ({
  plannerApp: {
    user: {
      state
    }
  }
}) => ({
  isConnected: state === USER_STATE_CONNECTED
});

const mapDispatchToProps = dispatch => ({
  save: (_, eventData) => {
    dispatch(createEvent(eventData));
  },
  showLogin: () => {
    dispatch(showActionLoginMessage());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
