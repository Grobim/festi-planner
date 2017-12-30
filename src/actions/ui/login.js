import {
  UI_LOGIN_ON_CHANGE
} from 'reducers/ui/login';

export const onLoginFieldChange = (field, value) => ({
  type: UI_LOGIN_ON_CHANGE,
  payload: {
    field,
    value
  }
});

export default {
  onLoginFieldChange
};
