import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, FilterType, requestUsers, follow, unfollow } from "../../redux/usersReducer";
import { getCurrentPage, getFilter, getFollowingProgress, getPageSize, getPortionOfPagesNumber, getTotalUsersCount, getUsers} from "../../redux/usersSelector";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";


export const Users: React.FC = () => {

  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getFilter)
  const followingProgress = useSelector(getFollowingProgress)
  const portionOfPagesNumber = useSelector(getPortionOfPagesNumber)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter));
  }, [])

  // const setFilter = (filter: FilterType) => {
  //   dispatch(actions.setFilter(filter))
  // }

  const setPortionOfPagesNumber = (portionNumber: number) => {
    dispatch(actions.setPortionOfPagesNumber(portionNumber))
  }
  const follow2 = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollow2 = (userId: number) => {
    dispatch(unfollow(userId))
  }
  const onPageChanged = (pageNumber: number, filter: FilterType) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
    dispatch(actions.setCurrentPage(pageNumber)); //?
  }
  // const onFilterChanged = (filter: FilterType) => {
  //   dispatch(actions.setPortionOfPagesNumber(1))
  //   dispatch(requestUsers(1, pageSize, filter.term))
  // }

  return (
    <div>
      <UsersSearchForm 
      // setFilter={setFilter}
                       onPageChanged={onPageChanged} 
                       setPortionOfPagesNumber={setPortionOfPagesNumber}
      />
      <Paginator totalItemsCount={totalUsersCount}
                 pageSize={pageSize}
                 currentPage={currentPage}
                 onPageChanged={onPageChanged}
                 portionSize={10}
                 portionOfPagesNumber={portionOfPagesNumber}
                 setPortionOfPagesNumber={setPortionOfPagesNumber}
                 filter={filter}
      />
      {users.map((user) => <User key={user.id} 
                                       user={user} 
                                       followingProgress={followingProgress}
                                       unfollow={unfollow2} 
                                       follow={follow2}
                                  />)}
    </div>
  )
}

export default Users;