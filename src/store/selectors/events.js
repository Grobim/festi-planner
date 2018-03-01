const eventsSelector = state => state.plannerApp.events;
const eventsDataSelector = state => eventsDataSelector(state).data;

export {
  eventsSelector,
  eventsDataSelector
};
