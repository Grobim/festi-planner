import firebase from 'firebase';

import {
  USER_CONNECT_REQUEST,
  USER_CONNECT_SUCCESS,
  USER_CONNECT_ERROR,
  USER_DISCONNECT_SUCCESS
} from 'reducers/user';

import { closeLogin } from 'actions/ui/global';

const connectRequest = () => ({
  type: USER_CONNECT_REQUEST
});

const connectSuccess = userData => ({
  type: USER_CONNECT_SUCCESS,
  payload: userData
});

const connectError = () => ({
  type: USER_CONNECT_ERROR
});

const disconnectSuccess = () => ({
  type: USER_DISCONNECT_SUCCESS
});

export const listenToAuth = () => (dispatch, getState) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const {
        uid,
        displayName,
        photoURL,
        email
      } = user;

      const userRef = firebase.database().ref(`users/${uid}`);

      userRef.on('value', (snap) => {
        const userProfile = snap.val();

        if (!userProfile) {
          userRef.set({
            displayName,
            photoURL,
            email
          });

          // TODO Toast profile
        } else {
          dispatch(connectSuccess({
            displayName: userProfile.displayName,
            photoURL: userProfile.photoURL,
            uid
          }));
        }

        dispatch(closeLogin());
      });
    } else {
      const { uid } = getState().plannerApp.user;

      if (uid) {
        firebase.database().ref(`presence/${uid}`).remove();
        firebase.database().ref(`users/${uid}`).off('value');

        dispatch(disconnectSuccess());
      }
    }
  });
};

const signInOrSignUp = (mail, password, dispatch) => {
  firebase.auth().signInWithEmailAndPassword(mail, password).then(
    null,
    (error) => {
      if (error.code === 'auth/user-not-found') {
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(mail, password);
      } else {
        dispatch(connectError());
      }
    }
  );
};

export const connect = (providerKey, mail, password) => (dispatch) => {
  let Provider;

  switch (providerKey) {
    case 'google':
      Provider = firebase.auth.GoogleAuthProvider;
      break;
    case 'facebook':
      Provider = firebase.auth.FacebookAuthProvider;
      break;
    case 'github':
      Provider = firebase.auth.GithubAuthProvider;
      break;
    case 'twitter':
      Provider = firebase.auth.TwitterAuthProvider;
      break;
    case 'password':
      break;
    default:
      return;
  }

  dispatch(connectRequest());

  if (Provider) {
    firebase.auth().signInWithPopup(new Provider()).then(
      null,
      () => {
        dispatch(connectError());
      }
    );
  } else {
    signInOrSignUp(mail, password, dispatch);
  }
};

export const disconnect = () => () => {
  firebase.auth().signOut();
};
