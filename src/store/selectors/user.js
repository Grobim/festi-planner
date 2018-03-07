import { USER_STATE_CONNECTED, USER_STATE_CONNECTING } from 'reducers/user';

const userSelector = state => state.plannerApp.user;
const stateSelector = state => userSelector(state).state;
const publicDataSelector = state => userSelector(state).publicData;
const photoUrlSelector = state => (publicDataSelector(state) || {}).photoURL;
const uidSelector = state => userSelector(state).uid;

const isConnectedSelector = state => stateSelector(state) === USER_STATE_CONNECTED;
const isConnectingSelector = state => stateSelector(state) === USER_STATE_CONNECTING;

export {
  userSelector,
  stateSelector,
  publicDataSelector,
  photoUrlSelector,
  uidSelector,
  isConnectedSelector,
  isConnectingSelector
};
