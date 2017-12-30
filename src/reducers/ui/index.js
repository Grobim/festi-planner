import { combineReducers } from 'redux';

import login from './login';
import global from './global';

export default combineReducers({
  login,
  global
});
