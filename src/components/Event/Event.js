import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import noop from 'lodash/noop';
import moment from 'moment';

import { withStyles } from 'material-ui/styles';

import TextField from 'material-ui/TextField';

import CreateIcon from 'material-ui-icons/Create';

import Fab from 'containers/Fab';

const styles = theme => ({
  layout: {
    padding: theme.spacing.unit,
    flex: 1
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  input: {
    flex: 1,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class Event extends Component {
  static propTypes = {
    isConnected: PropTypes.bool.isRequired,
    eventId: PropTypes.string,
    event: PropTypes.objectOf(PropTypes.any),
    syncEvent: PropTypes.func,
    unsyncEvent: PropTypes.func,
    save: PropTypes.func.isRequired,
    showLogin: PropTypes.func.isRequired,
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
        name: props.event.data.name,
        date: moment(props.event.data.date).format('YYYY-MM-DD')
      };
    }
  }

  state = {
    name: '',
    date: ''
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

    const currentDate = this.props.event.data && this.props.event.data.date;
    const newDate = newProps.event.data && newProps.event.data.date;

    if (currentDate !== newDate) {
      this.setState({
        date: moment(newDate).format('YYYY-MM-DD')
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
      name,
      date
    } = this.state;

    const {
      save,
      showLogin,
      eventId,
      isConnected
    } = this.props;

    if (isConnected) {
      save(eventId, {
        name,
        date: moment(date).valueOf()
      });
    } else {
      showLogin();
    }
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
      name,
      date
    } = this.state;

    return (
      <Fragment>
        <div className={classes.layout}>
          <form name="event" className={classes.container} onSubmit={this.handleEventSubmit}>
            <TextField
              id="name"
              label="Name"
              value={name}
              className={classes.input}
              onChange={this.handleFieldChange('name')}
            />
            <TextField
              id="date"
              label="Date"
              type="date"
              value={date}
              className={classes.input}
              onChange={this.handleFieldChange('date')}
              InputLabelProps={{
                shrink: true
              }}
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
