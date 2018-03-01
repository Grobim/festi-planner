import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { USER_STATE_CONNECTED } from 'reducers/user';
import { stateSelector } from 'store/selectors/user';

const authenticatedComponent = (Component, requireConnected = true) => {
  const mapStateToProps = state => ({
    isConnected: stateSelector(state) === USER_STATE_CONNECTED
  });

  const mapDispatchToProps = dispatch => ({
    goToHome: () => {
      dispatch(push('/'));
    }
  });

  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      isConnected: PropTypes.bool.isRequired,
      goToHome: PropTypes.func.isRequired,
      location: PropTypes.objectOf(PropTypes.any).isRequired
    };

    componentWillMount() {
      this.checkAuth(this.props.isConnected);
    }

    componentWillReceiveProps(nexProps) {
      if (this.props.isConnected !== nexProps.isConnected) {
        this.checkAuth(nexProps.isConnected);
      }
    }

    checkAuth = (isConnected) => {
      if (isConnected !== requireConnected) {
        const {
          goToHome
        } = this.props;

        if (!isConnected) {
          // TODO toast se connecter
        } else {
          goToHome();
        }
      }
    };

    render() {
      return (
        <Fragment>
          {this.props.isConnected === true
            ? <Component {...this.props} />
            : null
          }
        </Fragment>
      );
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
};

export default authenticatedComponent;
