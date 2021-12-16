import React from "react";
import styles from './Users.module.css';
import userPhoto from '../../../src/assets/images/defaultAvatar.png';
import {NavLink} from "react-router-dom";
import { UserType } from "../../types/types";

type PropsType = {
  user: UserType
  followingProgress: Array<Number>

  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

let User: React.FC<PropsType> = ({user, followingProgress, unfollow, follow}) => {

  return (
    <div>
      <span>
        <div>
          <NavLink to={`/profile/${user.id}`}>
            <img src={user.photos.small !== null ? user.photos.small : userPhoto} className={styles.userPhoto}/>
          </NavLink>
        </div>
        <div>
          {user.followed 
            ? <button 
              disabled={followingProgress.some(id => id === user.id)}
              onClick={ () => {
                unfollow(user.id)
            } }>Unfollow</button> 
            : <button 
              disabled={followingProgress.some(id => id === user.id)}
              onClick={ () => {
                follow(user.id)
              } }>Follow</button>}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{"user.location.country"}</div>
          <div>{"user.location.city"}</div>
        </span>
      </span>
    </div>
  )
}

export default User;