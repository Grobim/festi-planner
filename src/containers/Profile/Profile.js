import { connect } from 'react-redux';

import { syncProfile, unsyncProfile, editName, editAvatar } from 'actions/profile';

import Profile from 'components/Profile';

const mapStateToProps = (
  { plannerApp: { user, profile } },
  { params: { uid } }
) => ({
  uid,
  user: profile[uid],
  isCurrentUser: user.uid === uid
});

const mapDispatchToProps = dispatch => ({
  syncProfile: (uid) => {
    dispatch(syncProfile(uid));
  },
  unsyncProfile: (uid) => {
    dispatch(unsyncProfile(uid));
  },
  editName: (uid, displayName) => {
    dispatch(editName(uid, displayName));
  },
  editAvatar: (uid, avatarFile) => {
    dispatch(editAvatar(uid, avatarFile));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
