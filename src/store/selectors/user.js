const userSelector = state => state.plannerApp.user;
const stateSelector = state => userSelector(state).state;
const publicDataSelector = state => userSelector(state).publicData;
const photoUrlSelector = state => (publicDataSelector(state) || {}).photoURL;
const uidSelector = state => userSelector(state).uid;

export {
  userSelector,
  stateSelector,
  publicDataSelector,
  photoUrlSelector,
  uidSelector
};
