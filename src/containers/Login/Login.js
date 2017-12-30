import { connect } from 'react-redux';

import Login from 'components/Login';

import { connect as userConnect } from 'actions/user';
import { onLoginFieldChange } from 'actions/ui/login';

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
  },
  connectWithPassword: () => {
    dispatch(userConnect('password'));
  },
  handleChange: field => (event) => {
    dispatch(onLoginFieldChange(field, event.target.value));
  }
});

export default connect(null, mapDispatchToProps)(Login);
