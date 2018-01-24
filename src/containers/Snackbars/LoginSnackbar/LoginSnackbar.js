import { connect } from 'react-redux';

import LoginSnackbar from 'components/Snackbars/LoginSnackbar';

import { showLogin, closeLoginMessage } from 'actions/ui/global';

const mapStateToProps = ({
  plannerApp: {
    ui: {
      global: {
        snackbars: {
          login: { opened, type }
        }
      }
    }
  }
}) => ({
  open: opened,
  type
});

const mapDispatchToProps = dispatch => ({
  showLogin: () => {
    dispatch(showLogin());
  },
  onClose: () => {
    dispatch(closeLoginMessage());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginSnackbar);
