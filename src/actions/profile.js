import firebase from 'firebase';

import {
  PROFILE_PUBLIC_SYNC_REQUESTED,
  PROFILE_PUBLIC_SYNC_SUCCESS,
  PROFILE_PUBLIC_UNSYNC
} from 'reducers/profile';

const syncPublicProfileRequest = uid => ({
  type: PROFILE_PUBLIC_SYNC_REQUESTED,
  payload: {
    uid
  }
});

const syncPublicProfileSuccess = (uid, profile) => ({
  type: PROFILE_PUBLIC_SYNC_SUCCESS,
  payload: {
    ...profile,
    uid
  }
});

const unsyncedPublicProfile = uid => ({
  type: PROFILE_PUBLIC_UNSYNC,
  payload: {
    uid
  }
});

export const syncProfile = uid => (dispatch) => {
  dispatch(syncPublicProfileRequest(uid));

  const profileRef = firebase.database()
    .ref(`users/${uid}/publicData`);

  profileRef.on('value', (snap) => {
    dispatch(syncPublicProfileSuccess(uid, { publicData: snap.val() }));
  });
};

export const unsyncProfile = uid => (dispatch) => {
  firebase.database()
    .ref(`users/${uid}/publicData`)
    .off('value');

  dispatch(unsyncedPublicProfile(uid));
};

export const editName = (uid, displayName) => () => {
  firebase.database()
    .ref(`users/${uid}/publicData/displayName`)
    .set(displayName);
};

export const editAvatar = (uid, avatarFile) => () => {
  firebase.storage()
    .ref(`/avatars/${uid}`)
    .put(avatarFile)
    .then(snap => snap.downloadURL)
    .then(downloadURL => firebase.database()
      .ref(`users/${uid}/publicData/photoURL`)
      .set(downloadURL));
};

export default {
  syncProfile,
  unsyncProfile,
  editName,
  editAvatar
};
