const globalSelector = state => state.plannerApp.ui.global;
const drawerOpenedSelector = state => globalSelector(state).drawerOpened;

export {
  globalSelector,
  drawerOpenedSelector
};
