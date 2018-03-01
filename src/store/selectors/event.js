const eventSelector = state => state.plannerApp.event;
const eventPublicSelector = (state, eventId) => (eventSelector(state)[eventId]).public;

export {
  eventSelector,
  eventPublicSelector
};
