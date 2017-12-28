export const UI_TOGGLE_DRAWER = 'UI_TOGGLE_DRAWER';
export const UI_LOGIN_ON_CHANGE = 'UI_LOGIN_ON_CHANGE';

const defaultState = {
  drawerOpened: false
};

const ui = (state = defaultState, action) => {
  switch (action.type) {
    case UI_TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpened: !state.drawerOpened
      };
    case UI_LOGIN_ON_CHANGE:
      return {
        ...state,
        login: {
          ...state.login,
          [action.payload.field]: action.payload.value
        }
      };
    default:
      return state;
  }
};

export default ui;
