import {
  UI_TOGGLE_DRAWER,
  UI_LOGIN_ON_CHANGE
} from 'reducers/ui';

export const toggleDrawer = () => ({
  type: UI_TOGGLE_DRAWER
});

export const onLoginFieldChange = (field, value) => ({
  type: UI_LOGIN_ON_CHANGE,
  payload: {
    field,
    value
  }
});

export default {
  toggleDrawer,
  onLoginFieldChange
};
