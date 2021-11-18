import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {

  return (
    <div>
      <Paginator totalItemsCount={totalUsersCount}
                 pageSize={pageSize}
                 currentPage={currentPage}
                 onPageChanged={onPageChanged}
                 portionSize={10}
                 portionOfPagesNumber={props.portionOfPagesNumber}
                 setPortionOfPagesNumber={props.setPortionOfPagesNumber}
      />
      {props.users.map((user) => <User 
                                  key={user.id} 
                                  user={user} 
                                  followingProgress={props.followingProgress}
                                  unfollow={props.unfollow} 
                                  follow={props.follow}
                                  />)}
    </div>
  )
}

export default Users;