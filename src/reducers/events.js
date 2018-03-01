import moment from 'moment';

const EVENTS_FETCH_REQUESTED = 'EVENTS_FETCH_REQUESTED';
const EVENTS_FETCH_SUCCESS = 'EVENTS_FETCH_SUCCESS';

const EVENTS_FETCH_STATE_REQUEST = 'EVENTS_FETCH_STATE_REQUEST';
const EVENTS_FETCH_STATE_RECEIVED = 'EVENTS_FETCH_STATE_RECEIVED';

const defaultState = {
  state: null,
  query: {
    sort: 'eventDate',
    startAt: moment().startOf('day').valueOf(),
    pageSize: 10
  },
  data: null
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case EVENTS_FETCH_REQUESTED:
      return {
        ...state,
        state: EVENTS_FETCH_STATE_REQUEST
      };
    case EVENTS_FETCH_SUCCESS:
      return {
        ...state,
        state: EVENTS_FETCH_STATE_RECEIVED,
        data: action.payload
      };
    default:
      return state;
  }
};

export {
  EVENTS_FETCH_REQUESTED,
  EVENTS_FETCH_SUCCESS,
  EVENTS_FETCH_STATE_REQUEST,
  EVENTS_FETCH_STATE_RECEIVED
};

export default user;
