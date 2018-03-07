const eventsSelector = state => state.plannerApp.events;
const eventsDataSelector = state => eventsSelector(state).data;

export {
  eventsSelector,
  eventsDataSelector
};
