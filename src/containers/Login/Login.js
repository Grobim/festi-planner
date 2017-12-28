import { connect } from 'react-redux';

import Login from 'components/Login';

import { connect as userConnect } from 'actions/user';

const mapDispatchToProps = dispatch => ({
  connectWithGoogle: () => {
    dispatch(userConnect('google'));
  },
  connectWithFacebook: () => {
    dispatch(userConnect('facebook'));
  },
  connectWithGithub: () => {
    dispatch(userConnect('github'));
  },
  connectWithTwitter: () => {
    dispatch(userConnect('twitter'));
  }
});

export default connect(null, mapDispatchToProps)(Login);
