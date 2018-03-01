import firebase from 'firebase';

import {
  USER_CONNECT_REQUEST,
  USER_CONNECT_SUCCESS,
  USER_CONNECT_ERROR,
  USER_DISCONNECT_SUCCESS
} from 'reducers/user';

import {
  closeLogin,
  showError
} from 'actions/ui/global';

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

const listenToAuth = () => (dispatch, getState) => {
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

        if (userProfile) {
          dispatch(connectSuccess({
            uid,
            ...userProfile
          }));
        } else {
          userRef.set({
            publicData: {
              displayName,
              photoURL,
            },
            privateData: {
              email
            }
          });
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

const connect = (providerKey, mail, password) => (dispatch) => {
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
      (error) => {
        console.error('Connection failed', error);
        switch (error.code) {
          case 'auth/account-exists-with-different-credential': {
            firebase.auth().fetchProvidersForEmail(error.email).then((providers) => {
              dispatch(showError(`Un compte existe déjà avec cet email. (Source du compte: ${providers[0]})`));
            });
            break;
          }
          default:
            break;
        }
        dispatch(connectError());
      }
    );
  } else {
    signInOrSignUp(mail, password, dispatch);
  }
};

const disconnect = () => () => {
  firebase.auth().signOut();
};

export {
  listenToAuth,
  connect,
  disconnect
};
