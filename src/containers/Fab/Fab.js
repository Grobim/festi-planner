import { connect } from 'react-redux';

import Fab from 'components/Fab';

const mapStateToProps = ({
  plannerApp: {
    ui: {
      global: {
        snackbars
      }
    }
  }
}) => ({
  snackbarOpened: Boolean(snackbars.reload ||
    snackbars.default.opened ||
    snackbars.login.opened)
});

export default connect(mapStateToProps)(Fab);
