import React from "react";
import { Redirect } from "react-router";
import { ProfileType } from "../../types/types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";



export type OwnPropsType = {
  isOwner: boolean
}
export type MapPropsType = {
  profile: ProfileType | null
  status: string
  authorizedUserId: null | number
  isAuth: boolean
}
export type DispatchPropsType = {
  updateStatus: (newStatus: string) => void
  savePhoto: (file: any) => void
  saveProfile: (data: ProfileType) => Promise<any>
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
}
type PropsType = MapPropsType & DispatchPropsType & OwnPropsType

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div className={s.content}>
      <ProfileInfo
        profile={props.profile}
        updateStatus={props.updateStatus}
        status={props.status}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
