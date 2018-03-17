import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

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
    event: PropTypes.objectOf(PropTypes.any),
    save: PropTypes.func.isRequired,
    showLogin: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.any).isRequired
  };

  static defaultProps = {
    event: {}
  };

  constructor(props) {
    super(props);

    if (props.event.data) {
      this.state = {
        ...this.state,
        name: props.event.data.name,
        startDate: moment(props.event.data.startDate).format('YYYY-MM-DD'),
        endDate: moment(props.event.data.endDate).format('YYYY-MM-DD')
      };
    }
  }

  state = {
    name: '',
    startDate: '',
    endDate: ''
  };

  componentWillReceiveProps(newProps) {
    const currentName = this.props.event.data && this.props.event.data.name;
    const newName = newProps.event.data && newProps.event.data.name;

    if (currentName !== newName) {
      this.setState({
        name: newName
      });
    }

    const currentStartDate = this.props.event.data && this.props.event.data.startDate;
    const newStartDate = newProps.event.data && newProps.event.data.startDate;

    if (currentStartDate !== newStartDate) {
      this.setState({
        startDate: moment(newStartDate).format('YYYY-MM-DD')
      });
    }

    const currentEndDate = this.props.event.data && this.props.event.data.endDate;
    const newEndDate = newProps.event.data && newProps.event.data.endDate;

    if (currentEndDate !== newEndDate) {
      this.setState({
        endDate: moment(newEndDate).format('YYYY-MM-DD')
      });
    }
  }

  handleEventSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    const {
      name,
      startDate,
      endDate
    } = this.state;

    const {
      save,
      showLogin,
      isConnected
    } = this.props;

    if (isConnected) {
      save({
        name,
        startDate: moment(startDate).valueOf(),
        endDate: moment(endDate).valueOf()
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
      startDate,
      endDate
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
              id="startDate"
              label="Start date"
              type="date"
              value={startDate}
              className={classes.input}
              onChange={this.handleFieldChange('startDate')}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="endDate"
              label="End date"
              type="date"
              value={endDate}
              className={classes.input}
              onChange={this.handleFieldChange('endDate')}
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
