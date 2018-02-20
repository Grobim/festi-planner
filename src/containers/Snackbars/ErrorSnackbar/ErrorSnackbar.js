import { connect } from 'react-redux';

import DefaultSnackbar from 'components/Snackbars/DefaultSnackbar';

import { closeError } from 'actions/ui/global';

const mapStateToProps = ({
  plannerApp: {
    ui: {
      global: {
        snackbars: {
          error: { opened, message }
        }
      }
    }
  }
}) => ({
  open: opened,
  message,
  color: 'secondary',
  actionColor: 'secondary'
});

const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(closeError());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSnackbar);
