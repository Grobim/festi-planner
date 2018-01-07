import { combineReducers } from 'redux';
import user from './user';
import events from './events';
import ui from './ui';
import profile from './profile';

const plannerApp = combineReducers({
  user,
  ui,
  profile,
  events
});

export default plannerApp;
