import { USER_CONNECT_REQUEST, USER_CONNECT_SUCCESS } from 'reducers/user';

const connectRequest = () => ({
  type: USER_CONNECT_REQUEST
});

const connectSuccess = () => ({
  type: USER_CONNECT_SUCCESS
});

export const connect = () => (dispatch) => {
  dispatch(connectRequest());

  setTimeout(() => {
    dispatch(connectSuccess());
  }, 2000);
};

export default {
  connect
};
