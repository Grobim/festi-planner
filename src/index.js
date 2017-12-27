import React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import firebase from 'firebase';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';

import 'typeface-roboto';

import './index.css';
import plannerApp from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const firebaseConfig = {
  apiKey: 'AIzaSyCE2Ko9lTeyotNpf-mZ4cH7WCoTP7faVYc',
  authDomain: 'boiling-fire-3060.firebaseapp.com',
  databaseURL: 'https://boiling-fire-3060.firebaseio.com',
  projectId: 'firebase-boiling-fire-3060',
  storageBucket: 'firebase-boiling-fire-3060.appspot.com',
  messagingSenderId: '372841444977'
};

const reduxFirebaseConfig = {
  userProfile: 'users', // where profiles are stored in database
  presence: 'fcknye-planner/presence', // where list of online users is stored in database
  sessions: false
};

firebase.initializeApp(firebaseConfig);

const composers = [
  applyMiddleware(thunk),
  reactReduxFirebase(firebase, reduxFirebaseConfig)
];

  // eslint-disable-next-line no-underscore-dangle
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  // eslint-disable-next-line no-underscore-dangle
  composers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const createStoreWithFirebase = compose(...composers)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  plannerApp
});
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
