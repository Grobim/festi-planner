export const EVENTS_FETCH_REQUESTED = 'EVENTS_FETCH_REQUESTED';
export const EVENTS_FETCH_SUCCESS = 'EVENTS_FETCH_SUCCESS';

export const EVENTS_FETCH_STATE_REQUEST = 'EVENTS_FETCH_STATE_REQUEST';
export const EVENTS_FETCH_STATE_RECEIVED = 'EVENTS_FETCH_STATE_RECEIVED';

export const EVENTS_FETCH_KEYS_REQUESTED = 'EVENTS_FETCH_KEYS_REQUESTED';
export const EVENTS_FETCH_KEYS_SUCCESS = 'EVENTS_FETCH_KEYS_SUCCESS';

export const EVENTS_FETCH_KEYS_STATE_REQUEST = 'EVENTS_FETCH_KEYS_STATE_REQUEST';
export const EVENTS_FETCH_KEYS_STATE_RECEIVED = 'EVENTS_FETCH_KEYS_STATE_RECEIVED';

const defaultState = {
  state: null,
  data: null,
  query: {
    sort: 'lowercaseName',
    asc: true,
    pageSize: 2,
    pageNumber: 1
  },
  keys: [],
  keysState: null
};

const user = (state = defaultState, action = {}) => {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case EVENTS_FETCH_REQUESTED:
      return {
        ...state,
        data: defaultState.data,
        state: EVENTS_FETCH_STATE_REQUEST
      };
    case EVENTS_FETCH_SUCCESS:
      return {
        ...state,
        state: EVENTS_FETCH_STATE_RECEIVED,
        data: payload
      };
    case EVENTS_FETCH_KEYS_REQUESTED:
      return {
        ...state,
        keys: defaultState.keys,
        keysState: EVENTS_FETCH_KEYS_STATE_REQUEST
      };
    case EVENTS_FETCH_KEYS_SUCCESS:
      return {
        ...state,
        keys: payload,
        keysState: EVENTS_FETCH_KEYS_STATE_RECEIVED
      };
    default:
      return state;
  }
};

export default user;
