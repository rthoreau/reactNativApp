import { combineReducers } from 'redux';
import navState from './navigatorReducer';

const state = combineReducers({
  nav: navState,
});

export default state;
