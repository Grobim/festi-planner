import firebase from 'firebase';
import {
  USER_CONNECT_REQUEST,
  USER_CONNECT_SUCCESS,
  USER_CONNECT_ERROR,
  USER_DISCONNECT_SUCCESS
} from 'reducers/user';
import { push } from 'react-router-redux';

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

export const listenToAuth = getLocation => (dispatch, getState) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const {
        displayName,
        email,
        photoURL,
        uid
      } = user;

      dispatch(connectSuccess({
        displayName,
        email,
        photoURL,
        uid
      }));

      const userRef = firebase.database().ref(`fcknye-planner/users/${uid}`);

      userRef
        .once('value')
        .then((snap) => {
          const userProfile = snap.val();
          const currentLocation = getLocation().pathname;

          if (!userProfile) {
            userRef.set({
              displayName,
              email,
              photoURL,
              uid
            });

            dispatch(push('/profile'));
          } else if (currentLocation === '/login') {
            dispatch(push('/'));
          }
        });
    } else {
      const { uid } = getState().plannerApp.user;

      if (uid) {
        firebase.database().ref(`fcknye-planner/presence/${uid}`).remove();

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

export const connect = providerKey => (dispatch, getState) => {
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
    const {
      mail,
      password
    } = getState().plannerApp.ui.login;

    signInOrSignUp(mail, password, dispatch);
  }
};

export const disconnect = () => () => {
  firebase.auth().signOut();
};
