import {
  UI_TOGGLE_DRAWER,
  UI_SHOW_MESSAGE,
  UI_CLOSE_MESSAGE,
  UI_SHOW_RELOAD_MESSAGE,
  UI_SHOW_LOGIN,
  UI_CLOSE_LOGIN,
  UI_SHOW_LOGIN_MESSAGE,
  UI_CLOSE_LOGIN_MESSAGE
} from 'reducers/ui/global';

export const toggleDrawer = () => ({
  type: UI_TOGGLE_DRAWER
});

export const showMessage = message => ({
  type: UI_SHOW_MESSAGE,
  payload: message
});

export const closeMessage = () => ({
  type: UI_CLOSE_MESSAGE
});

export const showReloadMessage = () => ({
  type: UI_SHOW_RELOAD_MESSAGE
});

export const showLogin = () => ({
  type: UI_SHOW_LOGIN
});

export const closeLogin = () => ({
  type: UI_CLOSE_LOGIN
});

export const showActionLoginMessage = () => ({
  type: UI_SHOW_LOGIN_MESSAGE,
  payload: 'action'
});

export const closeLoginMessage = () => ({
  type: UI_CLOSE_LOGIN_MESSAGE
});

export default {
  toggleDrawer,
  showMessage,
  closeMessage,
  showReloadMessage,
  showLogin,
  closeLogin,
  showActionLoginMessage,
  closeLoginMessage
};
