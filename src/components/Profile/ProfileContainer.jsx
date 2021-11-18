import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getUserProfile, getStatus, updateStatus } from '../../redux/profileReducer'
import { withRouter } from "react-router";
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from "redux";


class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login")
      }
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  render() {
    // console.log("RENDER PROFILE");
    return (
      <Profile 
        {...this.props} 
        status={this.props.status} 
        profile={this.props.profile} 
        updateStatus={this.props.updateStatus}
        userId={this.props.match.params.userId}
      />
    )
  }

}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
  }
}

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer) 
