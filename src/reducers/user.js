export const USER_CONNECT_REQUEST = 'USER_CONNECT_REQUEST';
export const USER_CONNECT_SUCCESS = 'USER_CONNECT_SUCCESS';

export const USER_STATE_DISCONNECTED = 'USER_STATE_DISCONNECTED';
export const USER_STATE_CONNECTING = 'USER_STATE_CONNECTING';
export const USER_STATE_CONNECTED = 'USER_STATE_CONNECTED';

const defaultState = {
  state: USER_STATE_DISCONNECTED
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case USER_CONNECT_REQUEST:
      return {
        ...state,
        state: USER_STATE_CONNECTING
      };
    case USER_CONNECT_SUCCESS:
      return {
        ...state,
        state: USER_STATE_CONNECTED
      };
    default:
      return state;
  }
};

export default user;
