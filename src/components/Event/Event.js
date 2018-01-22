import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import noop from 'lodash/noop';

import { withStyles } from 'material-ui/styles';

import TextField from 'material-ui/TextField';

import CreateIcon from 'material-ui-icons/Create';

import Fab from 'components/Fab';

const styles = theme => ({
  layout: {
    padding: theme.spacing.unit,
    flex: 1
  }
});

class Event extends Component {
  static propTypes = {
    eventId: PropTypes.string.isRequired,
    event: PropTypes.objectOf(PropTypes.any),
    syncEvent: PropTypes.func,
    save: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.any).isRequired
  };

  static defaultProps = {
    event: {},
    syncEvent: noop
  };

  constructor(props) {
    super(props);

    if (props.event.key) {
      this.state = {
        ...this.state,
        name: props.event.name
      };
    }
  }

  state = {
    name: ''
  };

  componentDidMount() {
    const {
      syncEvent,
      eventId
    } = this.props;

    syncEvent(eventId);
  }

  handleEventSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    const {
      name
    } = this.state;

    const {
      save
    } = this.props;

    save({
      name
    });
  };

  handleFieldChange = field => (event) => {
    event.preventDefault();

    this.setState({
      [field]: event.target.value
    });
  };

  render() {
    const {
      eventId,
      classes
    } = this.props;

    const {
      name
    } = this.state;

    return (
      <Fragment>
        <div className={classes.layout}>
          <div>Coucou {eventId}</div>
          <form name="event" onSubmit={this.handleEventSubmit}>
            <TextField
              id="name"
              label="Name"
              value={name}
              onChange={this.handleFieldChange('name')}
            />
          </form>
        </div>
        <Fab
          color="primary"
          content={<CreateIcon />}
          onClick={this.handleEventSubmit}
        />
      </Fragment>
    );
  }
}

export default withStyles(styles)(Event);
