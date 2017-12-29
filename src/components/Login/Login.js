import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import GoogleIcon from 'components/GoogleIcon';
import FacebookIcon from 'components/FacebookIcon';
import TwitterIcon from 'components/TwitterIcon';
import GithubIcon from 'components/GithubIcon';

import './Login.css';

const Login = ({
  connectWithGoogle,
  connectWithFacebook,
  connectWithGithub,
  connectWithTwitter,
  handleChange,
  connectWithPassword
}) => (
  <Grid container>
    <Grid item xs={12} sm={6}>
      <Button className="Login-button" raised onClick={connectWithFacebook}>
        Sign in with Facebook
        <FacebookIcon className="Login-icon" />
      </Button>
      <Button className="Login-button" raised onClick={connectWithGoogle}>
        Sign in with Google
        <GoogleIcon className="Login-icon" />
      </Button>
      <Button className="Login-button" raised onClick={connectWithTwitter}>
        Sign in with Twitter
        <TwitterIcon className="Login-icon" />
      </Button>
      <Button className="Login-button" raised onClick={connectWithGithub}>
        Sign in with Github
        <GithubIcon className="Login-icon" />
      </Button>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Card className="Login-panel">
        <CardContent>
          <Typography type="headline">With email</Typography>
          <Typography
            className="Login-panelSubheading"
            type="subheading"
            color="secondary"
          >
            Even if that&apos;s lame...
          </Typography>
          <TextField
            id="mail"
            label="Mail"
            type="email"
            fullWidth
            onChange={handleChange('mail')}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            onChange={handleChange('password')}
          />
        </CardContent>
        <CardActions>
          <div style={{ flexGrow: 1 }} />
          <Button dense color="primary" onClick={connectWithPassword}>
            Sign in
          </Button>
        </CardActions>
      </Card>
    </Grid>
  </Grid>
);

Login.propTypes = {
  connectWithGoogle: PropTypes.func.isRequired,
  connectWithFacebook: PropTypes.func.isRequired,
  connectWithGithub: PropTypes.func.isRequired,
  connectWithTwitter: PropTypes.func.isRequired,
  connectWithPassword: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Login;
