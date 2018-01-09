import { connect } from 'react-redux';

import DefaultSnackbar from 'components/Snackbars/DefaultSnackbar';

import { closeMessage } from 'actions/ui/global';

const mapStateToProps = ({
  plannerApp: {
    ui: {
      global: {
        snackbars: {
          default: { opened, message }
        }
      }
    }
  }
}) => ({
  open: opened,
  message
});

const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(closeMessage());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSnackbar);
