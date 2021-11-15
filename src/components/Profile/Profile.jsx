import React from "react";
import { Redirect } from "react-router";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
  <div className={s.content}>
    {props.aboutMe}
    <ProfileInfo 
      profile={props.profile} 
      updateStatus={props.updateStatus} 
      status={props.status}
    />
    <MyPostsContainer 
      // store={props.store}
      // postsData={props.profilePage.postsData} // берем только state.profilePage.postsData
      // newPostText={props.profilePage.newPostText} // берем только свойство для текущего текста state.profilePage.newPostText
      // dispatch={props.dispatch}
      // addPost={props.addPost} 
      // updateNewPostText={props.updateNewPostText}
    />
  </div>
)
}

export default Profile;