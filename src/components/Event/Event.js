import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import noop from 'lodash/noop';

import { withStyles } from 'material-ui/styles';

import TextField from 'material-ui/TextField';

import CreateIcon from 'material-ui-icons/Create';

import Fab from 'containers/Fab';

const styles = theme => ({
  layout: {
    padding: theme.spacing.unit,
    flex: 1
  }
});

class Event extends Component {
  static propTypes = {
    eventId: PropTypes.string,
    event: PropTypes.objectOf(PropTypes.any),
    syncEvent: PropTypes.func,
    unsyncEvent: PropTypes.func,
    save: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.any).isRequired
  };

  static defaultProps = {
    eventId: null,
    event: {},
    syncEvent: noop,
    unsyncEvent: noop
  };

  constructor(props) {
    super(props);

    if (props.event.data) {
      this.state = {
        ...this.state,
        name: props.event.data.name
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

  componentWillReceiveProps(newProps) {
    const currentName = this.props.event.data && this.props.event.data.name;
    const newName = newProps.event.data && newProps.event.data.name;

    if (currentName !== newName) {
      this.setState({
        name: newName
      });
    }

    const currentEventId = this.props.eventId;
    const newEventId = newProps.eventId;

    if (currentEventId !== newEventId) {
      const {
        syncEvent,
        unsyncEvent
      } = this.props;

      unsyncEvent(currentEventId);
      syncEvent(newEventId);
    }
  }

  componentWillUnmount() {
    const {
      unsyncEvent,
      eventId
    } = this.props;

    unsyncEvent(eventId);
  }

  handleEventSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    const {
      name
    } = this.state;

    const {
      save,
      eventId
    } = this.props;

    save(eventId, {
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
      classes
    } = this.props;

    const {
      name
    } = this.state;

    return (
      <Fragment>
        <div className={classes.layout}>
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
