import firebase from 'firebase';

import {
  PROFILE_SYNC_REQUESTED,
  PROFILE_SYNC_SUCCESS,
  PROFILE_UNSYNC
} from 'reducers/profile';

const syncProfileRequest = uid => ({
  type: PROFILE_SYNC_REQUESTED,
  payload: {
    uid
  }
});

const syncProfileSuccess = (uid, profile) => ({
  type: PROFILE_SYNC_SUCCESS,
  payload: {
    ...profile,
    uid
  }
});

const unsyncedProfile = uid => ({
  type: PROFILE_UNSYNC,
  payload: {
    uid
  }
});

export const syncProfile = uid => (dispatch) => {
  dispatch(syncProfileRequest(uid));

  const profileRef = firebase.database()
    .ref(`fcknye-planner/users/${uid}`);

  profileRef.on('value', (snap) => {
    dispatch(syncProfileSuccess(snap.key, snap.val()));
  });
};

export const unsyncProfile = uid => (dispatch) => {
  firebase.database()
    .ref(`fcknye-planner/users/${uid}`)
    .off('value');

  dispatch(unsyncedProfile(uid));
};

export const editName = (uid, displayName) => () => {
  firebase.database()
    .ref(`fcknye-planner/users/${uid}/displayName`)
    .set(displayName);
};

export const editAvatar = (uid, avatarFile) => () => {
  firebase.storage()
    .ref(`/fcknye-planner/avatars/${uid}`)
    .put(avatarFile)
    .then(snap => snap.downloadURL)
    .then((downloadURL) => {
      firebase.database()
        .ref(`fcknye-planner/users/${uid}/photoURL`)
        .set(downloadURL);
    });
};

export default {
  syncProfile,
  unsyncProfile,
  editName,
  editAvatar
};
