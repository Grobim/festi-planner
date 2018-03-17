import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

class ProfileContainer extends Component {
  static propTypes = {
    syncProfile: PropTypes.func.isRequired,
    unsyncProfile: PropTypes.func.isRequired,
    uid: PropTypes.string.isRequired
  };

  componentDidMount() {
    const {
      syncProfile: sync,
      uid
    } = this.props;

    sync(uid);
  }

  componentWillReceiveProps(newProps) {
    const currentUid = this.props.uid;
    const newUid = newProps.uid;

    if (currentUid !== newUid) {
      const {
        syncProfile: sync,
        unsyncProfile: unsync
      } = this.props;

      unsync(currentUid);
      sync(newUid);
    }
  }

  componentWillUnmount() {
    const {
      unsyncProfile: unsync,
      uid
    } = this.props;

    unsync(uid);
  }

  render() {
    return <Profile {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
