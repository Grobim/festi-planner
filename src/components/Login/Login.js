import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import GoogleIcon from 'components/GoogleIcon';
import FacebookIcon from 'components/FacebookIcon';
import TwitterIcon from 'components/TwitterIcon';
import GithubIcon from 'components/GithubIcon';

const styles = {
  button: {
    width: '90%',
    margin: '12px 5%'
  },
  panel: {
    margin: '8px 5%'
  },
  panelSubheading: {
    fontSize: '0.8em'
  },
  icon: {
    marginLeft: 5
  },
  hiddenSubmit: {
    display: 'none'
  }
};

const Login = ({
  connectWithGoogle,
  connectWithFacebook,
  connectWithGithub,
  connectWithTwitter,
  handleChange,
  connectWithPassword,
  classes
}) => {
  const mailConnection = (event) => {
    if (event) {
      event.preventDefault();
    }

    connectWithPassword();
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={6}>
        <Button className={classes.button} raised onClick={connectWithFacebook}>
          Sign in with Facebook
          <FacebookIcon className={classes.icon} />
        </Button>
        <Button className={classes.button} raised onClick={connectWithGoogle}>
          Sign in with Google
          <GoogleIcon className={classes.icon} />
        </Button>
        <Button className={classes.button} raised onClick={connectWithTwitter}>
          Sign in with Twitter
          <TwitterIcon className={classes.icon} />
        </Button>
        <Button className={classes.button} raised onClick={connectWithGithub}>
          Sign in with Github
          <GithubIcon className={classes.icon} />
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card className={classes.panel}>
          <CardContent>
            <Typography type="headline">With email</Typography>
            <Typography
              className={classes.panelSubheading}
              type="subheading"
            >
              Even if that&apos;s lame...
            </Typography>
            <form onSubmit={mailConnection} name="login-email-form">
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
              <input type="submit" className={classes.hiddenSubmit} />
            </form>
          </CardContent>
          <CardActions>
            <div style={{ flexGrow: 1 }} />
            <Button dense color="primary" onClick={mailConnection}>
              Sign in
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  connectWithGoogle: PropTypes.func.isRequired,
  connectWithFacebook: PropTypes.func.isRequired,
  connectWithGithub: PropTypes.func.isRequired,
  connectWithTwitter: PropTypes.func.isRequired,
  connectWithPassword: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withStyles(styles)(Login);
