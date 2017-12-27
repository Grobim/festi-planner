import { combineReducers } from 'redux';
import user from './user';
import ui from './ui';

const plannerApp = combineReducers({
  user,
  ui
});

export default plannerApp;
