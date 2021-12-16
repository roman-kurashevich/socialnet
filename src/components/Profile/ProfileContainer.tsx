import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile,
} from "../../redux/profileReducer";
import { RouteComponentProps, withRouter } from "react-router";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import ErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";
import { ProfileType } from "../../types/types";
import { AppStateType } from "../../redux/reduxStore";

type PathParamsType = {
  userId: string 
}

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
  updateStatus: (newStatus: string) => void
  savePhoto: (file: File) => void
  saveProfile: (data: ProfileType) => Promise<any>
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps <PathParamsType>


class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    if (userId) {
      this.props.getUserProfile(userId);
      this.props.getStatus(userId);
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (prevProps.match.params.userId != this.props.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <Profile
          {...this.props}
          status={this.props.status}
          profile={this.props.profile}
          updateStatus={this.props.updateStatus}
          isOwner={!this.props.match.params.userId}
          savePhoto={this.props.savePhoto}
          saveProfile={this.props.saveProfile}
        />
      </ErrorBoundary>
    );
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
