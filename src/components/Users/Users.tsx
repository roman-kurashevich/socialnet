import { Formik } from "formik";
import React from "react";
import { FilterType } from "../../redux/usersReducer";
import { UserType } from "../../types/types";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";

type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  users: Array<UserType>
  portionOfPagesNumber: number
  followingProgress: Array<Number>
  filter: FilterType

  onPageChanged: (p: number) => void
  // onFilterChanged: (filter: FilterType) => void
  setPortionOfPagesNumber: (portionNumber: number) => void
  unfollow: (userId: number) => void
  follow: (userId: number) => void
  setFilter: (filter: FilterType) => void
}
let Users: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {

  return (
    <div>
      <UsersSearchForm setFilter={props.setFilter}
                       onPageChanged={onPageChanged} 
                       setPortionOfPagesNumber={props.setPortionOfPagesNumber}
      />
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