import firebase from 'firebase';
import {
  USER_CONNECT_REQUEST,
  USER_CONNECT_SUCCESS,
  USER_CONNECT_ERROR,
  USER_DISCONNECT_REQUEST,
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

const disconnectRequest = () => ({
  type: USER_DISCONNECT_REQUEST
});

const disconnectSuccess = () => ({
  type: USER_DISCONNECT_SUCCESS
});

const googleProvider = new firebase.auth.GoogleAuthProvider();

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

export const connect = () => (dispatch) => {
  dispatch(connectRequest());

  firebase.auth().signInWithPopup(googleProvider).then(
    null,
    () => {
      dispatch(connectError());
    }
  );
};

export const disconnect = () => (dispatch) => {
  dispatch(disconnectRequest());

  firebase.auth().signOut();
};
