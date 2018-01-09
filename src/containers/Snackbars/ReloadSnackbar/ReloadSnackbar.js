import { connect } from 'react-redux';

import ReloadSnackbar from 'components/Snackbars/ReloadSnackbar';

import { closeMessage } from 'actions/ui/global';

const mapStateToProps = ({
  plannerApp: {
    ui: {
      global: {
        snackbars: {
          reload
        }
      }
    }
  }
}) => ({
  open: reload
});

const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(closeMessage());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReloadSnackbar);
