import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { actions, FilterType, requestUsers, follow, unfollow } from "../../redux/usersReducer";
import { getCurrentPage, getFilter, getFollowingProgress, getPageSize, getPortionOfPagesNumber, getTotalUsersCount, getUsers} from "../../redux/usersSelector";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import * as queryString from 'querystring';
import { BooleanParam, NumberParam, StringParam, useQueryParams } from "use-query-params";

type QueryParamsType = {page?: string, count?: string, term?: string, friend?: string}

export const Users: React.FC = () => {

  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getFilter)
  const followingProgress = useSelector(getFollowingProgress)
  const portionOfPagesNumber = useSelector(getPortionOfPagesNumber)

  const dispatch = useDispatch();
  const history = useHistory();
  
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    count: NumberParam,
    term: StringParam,
    friend: StringParam,
  });

  useEffect(() => {

    // const search = history.location.search.substring(1)
    // const parsed = queryString.parse(search) as QueryParamsType
    // let actualPage = currentPage
    // let actualFilter = filter
    // let actualPageSize = pageSize
    // if (parsed.page) actualPage =Number(parsed.page)
    // if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
    // if (!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null :
    //                                                               parsed.friend === 'true' ? true : false}
    // if(!!parsed.count) actualPageSize = Number(parsed.count)
    // dispatch(requestUsers(actualPage, actualPageSize, actualFilter));

    let actualPage = currentPage
    let actualFilter = filter
    let actualPageSize = pageSize
    if (query.page) actualPage = query.page
    if (!!query.term) actualFilter = {...actualFilter, term: query.term}
    if (!!query.friend) actualFilter = {...actualFilter, friend: query.friend === 'null' ? null :
                                                                 query.friend === 'true' ? true : false}
                                                                 console.log(query.friend)
    if(!!query.count) actualPageSize = query.count
    dispatch(actions.setPageSize(actualPageSize))
    dispatch(requestUsers(actualPage, actualPageSize, actualFilter));
  }, [])

  useEffect(() => {

    // const query: QueryParamsType = {}
    // if (!!filter.term) query.term = filter.term
    // if (filter.friend !== null) query.friend = String(filter.friend)
    // if (currentPage !== 1) query.page = String(currentPage)
    // if (pageSize) query.count = String(pageSize)

    // history.push({
    //   pathname: "/developers",
    //   search: queryString.stringify(query)
    //   // search: `?count=${pageSize}&page=${currentPage}&term=${filter.term}&friend=${filter.friend}`
    // })


      // something like: ?x=123&q=foo&filters=a&filters=b&filters=c in the URL


  setQuery({
    page: currentPage,
    count: pageSize,
    term: filter.term,
    friend: String(filter.friend)
  })


  }, [filter, currentPage, pageSize])

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