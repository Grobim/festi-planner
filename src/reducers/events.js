import moment from 'moment';

const EVENTS_SYNC_REQUESTED = 'EVENTS_SYNC_REQUESTED';
const EVENTS_SYNC_SUCCESS = 'EVENTS_SYNC_SUCCESS';
const EVENTS_UNSYNCED = 'EVENTS_UNSYNCED';

const EVENTS_SYNC_STATE_REQUEST = 'EVENTS_SYNC_STATE_REQUEST';
const EVENTS_SYNC_STATE_RECEIVED = 'EVENTS_SYNC_STATE_RECEIVED';
const EVENTS_UNSYNCED_STATE = 'EVENTS_UNSYNCED_STATE';

const defaultState = {
  state: null,
  query: {
    sort: 'eventStartDate',
    startAt: moment().startOf('day').valueOf(),
    pageSize: 10
  },
  data: null
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case EVENTS_SYNC_REQUESTED:
      return {
        ...state,
        state: EVENTS_SYNC_STATE_REQUEST
      };
    case EVENTS_SYNC_SUCCESS:
      return {
        ...state,
        state: EVENTS_SYNC_STATE_RECEIVED,
        data: action.payload
      };
    case EVENTS_UNSYNCED:
      return {
        ...state,
        state: EVENTS_UNSYNCED_STATE
      };
    default:
      return state;
  }
};

export {
  EVENTS_SYNC_REQUESTED,
  EVENTS_SYNC_SUCCESS,
  EVENTS_UNSYNCED,
  EVENTS_SYNC_STATE_REQUEST,
  EVENTS_SYNC_STATE_RECEIVED,
  EVENTS_UNSYNCED_STATE
};

export default user;
