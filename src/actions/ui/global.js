import {
  UI_TOGGLE_DRAWER,
  UI_SHOW_MESSAGE,
  UI_CLOSE_MESSAGE,
  UI_SHOW_ERROR,
  UI_CLOSE_ERROR,
  UI_SHOW_RELOAD_MESSAGE,
  UI_SHOW_LOGIN,
  UI_CLOSE_LOGIN,
  UI_SHOW_LOGIN_MESSAGE,
  UI_CLOSE_LOGIN_MESSAGE
} from 'reducers/ui/global';

const toggleDrawer = () => ({
  type: UI_TOGGLE_DRAWER
});

const showMessage = message => ({
  type: UI_SHOW_MESSAGE,
  payload: {
    message
  }
});

const closeMessage = () => ({
  type: UI_CLOSE_MESSAGE
});

const showError = message => ({
  type: UI_SHOW_ERROR,
  payload: {
    message
  }
});

const closeError = () => ({
  type: UI_CLOSE_ERROR
});

const showReloadMessage = () => ({
  type: UI_SHOW_RELOAD_MESSAGE
});

const showLogin = () => ({
  type: UI_SHOW_LOGIN
});

const closeLogin = () => ({
  type: UI_CLOSE_LOGIN
});

const showActionLoginMessage = () => ({
  type: UI_SHOW_LOGIN_MESSAGE,
  payload: 'action'
});

const closeLoginMessage = () => ({
  type: UI_CLOSE_LOGIN_MESSAGE
});

export {
  toggleDrawer,
  showMessage,
  closeMessage,
  showError,
  closeError,
  showReloadMessage,
  showLogin,
  closeLogin,
  showActionLoginMessage,
  closeLoginMessage
};
