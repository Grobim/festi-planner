import { connect } from 'react-redux';
import Home from 'components/Home';
import { connect as userConnect, disconnect } from 'actions/user';

const mapDispatchToProps = dispatch => ({
  connect: () => {
    dispatch(userConnect());
  },
  disconnect: () => {
    dispatch(disconnect());
  }
});

export default connect(null, mapDispatchToProps)(Home);
