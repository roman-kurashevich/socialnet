import React from "react";
import styles from './Users.module.css';
import userPhoto from '../../../src/assets/images/defaultAvatar.png';
import { NavLink } from "react-router-dom";
import {userAPI} from '../../api/api'

let UsersClass = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let onPageChanged = (p) => {
    props.onPageChanged(p)
  }

  return (
    <div>
      <div>
        {pages.slice(0, 10).map(p => <span 
        className={`${styles.pagesNumbers} ${props.currentPage === p && styles.selectedPage}`}
        key={p}
        onClick={() => onPageChanged(p)}>
          {p}
        </span>)}
      </div>
      {
        props.users.map((user) => <div key={user.id}>
          <span>
            <div>
              <NavLink to={`/profile/${user.id}`}>
                <img src={user.photos.small !== null ? user.photos.small : userPhoto} className={styles.userPhoto}/>
              </NavLink>
            </div>
            <div>
              {user.followed 
                ? <button 
                  disabled={props.followingProgress.some(id => id === user.id)}
                  onClick={ () => {
                    props.unfollow(user.id)
                  // props.toggleFollowingProgress(true, user.id) // дисэйблим кнопку
                  // userAPI.unfollowUser(user.id)
                  // .then(data => {
                  //   if(data.resultCode == 0) {
                  //     props.unfollow(user.id)
                  //   }
                  //   props.toggleFollowingProgress(false, user.id)
                  // });
                } }>Unfollow</button> 
                : <button 
                  disabled={props.followingProgress.some(id => id === user.id)}
                  onClick={ () => {
                    props.follow(user.id)
                  // props.toggleFollowingProgress(true, user.id)
                  // userAPI.followUser(user.id)
                  // .then(data => {
                  //   if(data.resultCode == 0) {
                  //     props.follow(user.id)
                  //   }
                  //   props.toggleFollowingProgress(false, user.id)  // расдисэйблим кнопку
                  // })
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
        </div>)
      }
    </div>
  )
}


export default UsersClass;