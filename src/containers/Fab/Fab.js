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
  in: snackbars.reload || snackbars.default.opened
});

export default connect(mapStateToProps)(Fab);
