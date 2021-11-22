import { userAPI } from "../api/api";
import { updateObjectInArray } from '../utils/object-helpers'

const FOLLOW = 'usersReducer/FOLLOW';
const UNFOLLOW = 'usersReducer/UNFOLLOW';
const SET_USERS = 'usersReducer/SET_USERS';
const SET_CURRENT_PAGE = 'usersReducer/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'usersReducer/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'usersReducer/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'usersReducer/TOGGLE_IS_FOLLOWING_PROGRESS';
const SET_PORTION_OF_PAGES_NUMBER = 'usersReducer/SET_PORTION_OF_PAGES_NUMBER';

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 3,
  isFetching: true,
  followingProgress: [],
  portionOfPagesNumber: 1,
  fake: 10
}

const usersReducer = (state = initialState, action) => {

  switch (action.type) {

    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
        // users: state.users.map((u) => {
        //   if(u.id === action.userId) {
        //     return {...u, followed: true}
        //   }
        //   return u;
        // })
      }

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
        // users: state.users.map((u) => {
        //   if(u.id === action.userId) {
        //     return {...u, followed: false}
        //   }
        //   return u;
        // })
      }

    case SET_USERS:
      return {...state,users: [...action.users]}

    case SET_CURRENT_PAGE:
      return {...state, currentPage: action.currentPage}

    case SET_PORTION_OF_PAGES_NUMBER:
      return {...state, portionOfPagesNumber: action.portionNumber}

    case SET_TOTAL_USERS_COUNT:
      return {...state, totalUsersCount: action.totalUsersCount}

    case TOGGLE_IS_FETCHING:
      return {...state, isFetching: action.isFetching}

    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state, 
        followingProgress: action.isFetching 
        ? [...state.followingProgress, action.userId]
        : state.followingProgress.filter(id => id != action.userId)
      }

    default: 
      return state;
  }
 
}

export const followSucces = (userId) => ({type: FOLLOW, userId})
export const unfollowSucces = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setPortionOfPagesNumber = (portionNumber) => ({type: SET_PORTION_OF_PAGES_NUMBER, portionNumber})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

export const requestUsers = (currentPage, pageSize) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    let data = await userAPI.getUsers(currentPage, pageSize)
    dispatch(setIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(setCurrentPage(currentPage)); // ?
  }
}

const followUnfollowFlow = async(dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleFollowingProgress(true, userId)) // дисэйблим кнопку

  let response = await apiMethod(userId)

  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId))
  }

  dispatch(toggleFollowingProgress(false, userId));
}

export const unfollow = (userId) => {
  return async (dispatch) => {
    followUnfollowFlow(dispatch, userId, userAPI.unfollow.bind(userAPI), unfollowSucces)
  }
}

export const follow = (userId) => {
  return async (dispatch) => {
    followUnfollowFlow(dispatch, userId, userAPI.follow.bind(userAPI), followSucces)
  }
}





export default usersReducer;