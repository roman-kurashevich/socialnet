import React from "react";
import { UserType } from "../../types/types";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  users: Array<UserType>
  portionOfPagesNumber: number
  followingProgress: Array<Number>

  onPageChanged: (p: number) => void
  setPortionOfPagesNumber: (portionNumber: number) => void
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}
let Users: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {

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
      {props.users.map((user) => <User key={user.id} 
                                       user={user} 
                                       followingProgress={props.followingProgress}
                                       unfollow={props.unfollow} 
                                       follow={props.follow}
                                  />)}
    </div>
  )
}

export default Users;