import React from "react";
import s from './FriendsTop.module.css'

const FriendsTop = (props) => {
  let avatars = [];
  props.friendsData.forEach(friend => {
    avatars.push(
      <div key={friend.id}>
        <img src={friend.avatarSrc} className={s.avatarImg}/>
        <div>{friend.name}</div>
      </div>)
  });
  return (
    <div className={s.friendsTopAvatars}>
      {avatars.slice(0, 3)}
    </div>
  )
}

export default FriendsTop;