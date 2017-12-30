export const UI_LOGIN_ON_CHANGE = 'UI_LOGIN_ON_CHANGE';

const login = (state = {}, action) => {
  switch (action.type) {
    case UI_LOGIN_ON_CHANGE:
      return {
        ...state,
        [action.payload.field]: action.payload.value
      };
    default:
      return state;
  }
};

export default login;
