import { combineReducers } from 'redux';
import user from './user';
import ui from './ui';
import profile from './profile';

const plannerApp = combineReducers({
  user,
  ui,
  profile
});

export default plannerApp;
