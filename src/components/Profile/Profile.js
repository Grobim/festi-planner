import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import TextField from 'material-ui/TextField';

import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import FileUploadIcon from 'material-ui-icons/FileUpload';

const styles = theme => ({
  layout: {
    padding: theme.spacing.unit
  },
  avatarLayout: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative'
  },
  avatarIcon: {
    width: 80,
    height: 80
  },
  avatarEdit: {
    position: 'absolute',
    top: 25,
    right: 50
  },
  hiddenFileUploader: {
    display: 'none'
  },
  textField: {
    height: 44
  }
});

class Profile extends Component {
  static propTypes = {
    syncProfile: PropTypes.func.isRequired,
    unsyncProfile: PropTypes.func.isRequired,
    editName: PropTypes.func.isRequired,
    editAvatar: PropTypes.func.isRequired,
    uid: PropTypes.string.isRequired,
    user: PropTypes.objectOf(PropTypes.any),
    isCurrentUser: PropTypes.bool.isRequired,
    classes: PropTypes.objectOf(PropTypes.any).isRequired
  };

  static defaultProps = {
    user: {}
  };

  constructor(props) {
    super(props);

    if (props.user.profile) {
      this.state = {
        ...this.state,
        name: props.user.profile.displayName
      };
    }
  }

  state = {
    name: '',
    editName: false
  };

  componentDidMount() {
    const {
      syncProfile,
      uid
    } = this.props;

    syncProfile(uid);
  }

  componentWillReceiveProps(newProps) {
    const currentUid = this.props.uid;
    const newUid = newProps.uid;

    const currentName = this.props.user.profile && this.props.user.profile.displayName;
    const newName = newProps.user.profile && newProps.user.profile.displayName;

    if (currentUid !== newUid) {
      const {
        syncProfile,
        unsyncProfile
      } = this.props;

      unsyncProfile(currentUid);
      syncProfile(newUid);
    }

    if (currentName !== newName) {
      this.setState({
        name: newName
      });
    }
  }

  componentWillUnmount() {
    const {
      unsyncProfile,
      uid
    } = this.props;

    unsyncProfile(uid);
  }

  handleEditName = () => {
    if (this.state.editName) {
      this.handleNameSubmit();
    } else {
      this.setState(prevState => ({
        editName: !prevState.editName
      }));
    }
  };

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    });
  };

  handleNameSubmit = (event) => {
    const {
      uid,
      user,
      editName
    } = this.props;
    const {
      name
    } = this.state;

    if (user.profile.displayName !== name) {
      editName(uid, name);
    }

    this.setState({
      editName: false
    });

    if (event) {
      event.preventDefault();
    }
  };

  handleEditAvatar = () => {
    this.fileUploader.click();
  };

  handleUploadFile = (event) => {
    event.preventDefault();

    const { uid, editAvatar } = this.props;
    const reader = new window.FileReader();
    const file = event.target.files[0];

    // Something throws an exception, don't care why, fuck it
    try {
      reader.onloadend = () => {
        editAvatar(uid, file);
      };

      reader.readAsDataURL(file);
    } catch (e) {
      // Ok, let's log it anyway
      console.error(e);
    }
  };

  render() {
    const {
      user,
      isCurrentUser,
      classes
    } = this.props;

    const {
      editName,
      name
    } = this.state;

    return (
      <Grid container className={classes.layout} spacing={0}>
        <Grid item xs={12} sm={6}>
          <Paper>
            <Grid container>
              <Grid item xs={12} className={classes.avatarLayout}>
                <Icon color="primary">
                  {user.profile && user.profile.photoURL ? (
                    <Avatar src={user.profile.photoURL} className={classes.avatarIcon} />
                  ) : (
                    <AccountCircleIcon className={classes.avatarIcon} />
                  )}
                </Icon>
                {isCurrentUser && (
                  <Fragment>
                    <IconButton
                      aria-label="Edit"
                      onClick={this.handleEditAvatar}
                      className={classes.avatarEdit}
                    >
                      <FileUploadIcon />
                    </IconButton>
                    <input
                      type="file"
                      accept="image/*"
                      ref={(ref) => { this.fileUploader = ref; }}
                      onChange={this.handleUploadFile}
                      className={classes.hiddenFileUploader}
                    />
                  </Fragment>
                )}
              </Grid>
              <Grid item xs={12}>
                <List>
                  <ListItem>
                    <Icon>
                      <AccountCircleIcon />
                    </Icon>
                    <ListItemText
                      primary={
                        <form onSubmit={this.handleNameSubmit} name="name">
                          <TextField
                            id="name"
                            label="Name"
                            value={name}
                            onChange={this.handleNameChange}
                            disabled={!editName}
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            helperText={isCurrentUser ? 'A name is needed to plan nights !' : undefined}
                            error={editName && !name}
                          />
                        </form>
                      }
                    />
                    {isCurrentUser && (
                      <ListItemSecondaryAction>
                        <IconButton
                          aria-label="Edit"
                          onClick={this.handleEditName}
                          color={editName ? 'secondary' : 'default'}
                        >
                          <ModeEditIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Profile);
