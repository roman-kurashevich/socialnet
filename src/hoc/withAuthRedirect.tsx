import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import { AppStateType } from "../redux/reduxStore";

let mapStateToPropsForRedirect = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth
  }
}
type MapPropsType = {
  isAuth: boolean
}
type MapDispatchType = {
}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType) {

  const RedirectComponent: React.FC<MapPropsType & MapDispatchType> = (props) => {
    let{isAuth, ...restProps} = props;
    
    if (!isAuth) return <Redirect to={"/login"}/>
    
    return <WrappedComponent {...restProps as WCP}/>
  }

  let ConnectedAuthRedirectComponent = connect<MapPropsType, MapDispatchType, WCP, AppStateType>(
    mapStateToPropsForRedirect, {})
    (RedirectComponent);
  return ConnectedAuthRedirectComponent;
}