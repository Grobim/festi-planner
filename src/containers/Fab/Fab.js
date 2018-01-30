import { connect } from 'react-redux';

import withWidth, { isWidthDown } from 'material-ui/utils/withWidth';

import Fab from 'components/Fab';

const mapStateToProps = ({
  plannerApp: {
    ui: {
      global: {
        snackbars
      }
    }
  }
}, {
  width
}) => ({
  shouldSlideUp: Boolean((snackbars.reload ||
    snackbars.default.opened ||
    snackbars.login.opened) && isWidthDown('sm', width))
});

export default withWidth()(connect(mapStateToProps)(Fab));
