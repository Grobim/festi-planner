import { connect } from 'react-redux';

import LoginModal from 'components/Modals/LoginModal';

import { closeLogin } from 'actions/ui/global';

const mapStateToProps = ({
  plannerApp: {
    ui: {
      global: {
        modals: {
          login
        }
      }
    }
  }
}) => ({
  open: login
});

const mapDispatchToProps = dispatch => ({
  closeLogin: () => {
    dispatch(closeLogin());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
