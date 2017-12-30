export const UI_TOGGLE_DRAWER = 'UI_TOGGLE_DRAWER';

const defaultState = {
  drawerOpened: false
};

const global = (state = defaultState, action) => {
  switch (action.type) {
    case UI_TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpened: !state.drawerOpened
      };
    default:
      return state;
  }
};

export default global;
