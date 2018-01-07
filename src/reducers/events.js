export const EVENTS_FETCH_REQUESTED = 'EVENTS_FETCH_REQUESTED';
export const EVENTS_FETCH_SUCCESS = 'EVENTS_FETCH_SUCCESS';

export const EVENTS_FETCH_STATE_REQUEST = 'EVENTS_FETCH_STATE_REQUEST';
export const EVENTS_FETCH_STATE_RECEIVED = 'EVENTS_FETCH_STATE_RECEIVED';

const defaultState = {
  state: null,
  query: {
    sort: 'lowercaseName',
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

export default user;
