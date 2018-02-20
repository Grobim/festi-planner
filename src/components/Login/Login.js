import React, { Component } from 'react';
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

class Login extends Component {
  static propTypes = {
    connectWithGoogle: PropTypes.func.isRequired,
    connectWithFacebook: PropTypes.func.isRequired,
    connectWithGithub: PropTypes.func.isRequired,
    connectWithTwitter: PropTypes.func.isRequired,
    connectWithPassword: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.any).isRequired
  };

  state = {
    mail: '',
    password: ''
  };

  onLoginEmailSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    const {
      connectWithPassword
    } = this.props;

    const {
      mail,
      password
    } = this.state;

    connectWithPassword(mail, password);
  };

  handleFieldChange = field => (event) => {
    event.preventDefault();

    this.setState({
      [field]: event.target.value
    });
  };

  render() {
    const {
      connectWithGoogle,
      connectWithFacebook,
      connectWithGithub,
      connectWithTwitter,
      classes
    } = this.props;

    const {
      mail,
      password
    } = this.state;

    return (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <Button className={classes.button} variant="raised" onClick={connectWithFacebook}>
            Sign in with Facebook
            <FacebookIcon className={classes.icon} />
          </Button>
          <Button className={classes.button} variant="raised" onClick={connectWithGoogle}>
            Sign in with Google
            <GoogleIcon className={classes.icon} />
          </Button>
          <Button className={classes.button} variant="raised" onClick={connectWithTwitter}>
            Sign in with Twitter
            <TwitterIcon className={classes.icon} />
          </Button>
          <Button className={classes.button} variant="raised" onClick={connectWithGithub}>
            Sign in with Github
            <GithubIcon className={classes.icon} />
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.panel}>
            <CardContent>
              <Typography variant="headline">With email</Typography>
              <Typography
                className={classes.panelSubheading}
                variant="subheading"
              >
                Even if that&apos;s lame...
              </Typography>
              <form onSubmit={this.onLoginEmailSubmit} name="login-email-form">
                <TextField
                  id="mail"
                  label="Mail"
                  type="email"
                  fullWidth
                  value={mail}
                  onChange={this.handleFieldChange('mail')}
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={this.handleFieldChange('password')}
                />
                <input type="submit" className={classes.hiddenSubmit} />
              </form>
            </CardContent>
            <CardActions>
              <div style={{ flexGrow: 1 }} />
              <Button size="small" color="primary" onClick={this.onLoginEmailSubmit}>
                Sign in
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
