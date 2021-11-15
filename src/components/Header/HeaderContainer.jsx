import React from "react";
import { connect } from "react-redux";
import Header from './Header';
import { logout } from '../../redux/authReducer';

class HeaderContainer extends React.Component {


  render() {
    return (
      <Header {...this.props} profile={this.props.profile}/>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    id: state.auth.id,
    email: state.auth.email,
    login: state.auth.login,
    isAuth: state.auth.isAuth,
  }
}
export default connect(mapStateToProps, {logout})(HeaderContainer);