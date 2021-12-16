import React from "react";
import {connect} from "react-redux";
import Header, { DispatchPropsType, MapPropsType } from './Header';
import {logout} from '../../redux/authReducer';
import { AppStateType } from "../../redux/reduxStore";

const HeaderContainer: React.FC<MapPropsType & DispatchPropsType> = (props) => {

  return (
    <Header {...props} />
  )
}

let mapStateToProps = (state: AppStateType) => {
  return {
    login: state.auth.login,
    isAuth: state.auth.isAuth,
  }
}

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {logout})(HeaderContainer);