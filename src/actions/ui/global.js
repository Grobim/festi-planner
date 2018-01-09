import {
  UI_TOGGLE_DRAWER,
  UI_SHOW_MESSAGE,
  UI_CLOSE_MESSAGE,
  UI_SHOW_RELOAD_MESSAGE
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

export default {
  toggleDrawer
};
