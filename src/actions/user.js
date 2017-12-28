import firebase from 'firebase';
import {
  USER_CONNECT_REQUEST,
  USER_CONNECT_SUCCESS,
  USER_CONNECT_ERROR,
  USER_DISCONNECT_SUCCESS
} from 'reducers/user';

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
    } else {
      const { uid } = getState().plannerApp.user;

      if (uid) {
        firebase.database().ref(`fcknye-planner/presence/${uid}`).remove();
        dispatch(disconnectSuccess());
      }
    }
  });
};

export const connect = providerKey => (dispatch) => {
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
    default:
      return;
  }

  dispatch(connectRequest());

  firebase.auth().signInWithPopup(new Provider()).then(
    null,
    () => {
      dispatch(connectError());
    }
  );
};

export const disconnect = () => () => {
  firebase.auth().signOut();
};
