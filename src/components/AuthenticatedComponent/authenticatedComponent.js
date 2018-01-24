import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { USER_STATE_CONNECTED } from 'reducers/user';

export const authenticatedComponent = (Component, requireConnected = true) => {
  class AuthenticatedComponent extends React.Component {
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

  AuthenticatedComponent.propTypes = {
    isConnected: PropTypes.bool.isRequired,
    goToHome: PropTypes.func.isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired
  };

  const mapStateToProps = ({ plannerApp: { user: { state } } }) => ({
    isConnected: state === USER_STATE_CONNECTED
  });

  const mapDispatchToProps = dispatch => ({
    goToHome: () => {
      dispatch(push('/'));
    }
  });

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
};

export default authenticatedComponent;
