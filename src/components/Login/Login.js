import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import GoogleIcon from 'components/GoogleIcon';
import FacebookIcon from 'components/FacebookIcon';
import TwitterIcon from 'components/TwitterIcon';
import GithubIcon from 'components/GithubIcon';

import './Login.css';

const Login = ({
  connectWithGoogle,
  connectWithFacebook,
  connectWithGithub,
  connectWithTwitter
}) => (
  <Grid container>
    <Grid item xs={12} sm={6}>
      <Button className="Login-button" raised onClick={connectWithGoogle}>
        Sign in with Google
        <GoogleIcon className="Login-icon" viewBox="0 0 128 128" />
      </Button>
      <Button className="Login-button" raised onClick={connectWithFacebook}>
        Sign in with Facebook
        <FacebookIcon className="Login-icon" viewBox="0 0 128 128" />
      </Button>
      <Button className="Login-button" raised onClick={connectWithTwitter}>
        Sign in with Twitter
        <TwitterIcon className="Login-icon" viewBox="0 0 128 128" />
      </Button>
      <Button className="Login-button" raised onClick={connectWithGithub}>
        Sign in with Github
        <GithubIcon className="Login-icon" viewBox="0 0 128 128" />
      </Button>
    </Grid>
  </Grid>
);

Login.propTypes = {
  connectWithGoogle: PropTypes.func.isRequired,
  connectWithFacebook: PropTypes.func.isRequired,
  connectWithGithub: PropTypes.func.isRequired,
  connectWithTwitter: PropTypes.func.isRequired
};

export default Login;
