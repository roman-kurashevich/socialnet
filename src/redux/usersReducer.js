import { userAPI } from "../api/api"

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 3,
  isFetching: true,
  followingProgress: [],
}

const usersReducer = (state = initialState, action) => {

  switch (action.type) {

    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if(u.id === action.userId) {
            return {...u, followed: true}
          }
          return u;
        })
      }

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if(u.id === action.userId) {
            return {...u, followed: false}
          }
          return u;
        })
      }

    case SET_USERS:
      return {...state,users: [...action.users]}

    case SET_CURRENT_PAGE:
      return {...state, currentPage: action.currentPage}

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
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

export const requestUsers = (currentPage, pageSize) => {
  return (dispatch) => {
    dispatch(setIsFetching(true));
    userAPI.getUsers(currentPage, pageSize)
    .then(data => {
      dispatch(setIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
    })
    dispatch(setCurrentPage(currentPage)); // ?
  }
}
export const unfollow = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId)) // дисэйблим кнопку
    userAPI.unfollow(userId)
    .then(data => {
      if(data.resultCode == 0) {
        dispatch(unfollowSucces(userId))
      }
      dispatch(toggleFollowingProgress(false, userId))
    });
  }
}
export const follow = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId)) // дисэйблим кнопку
    userAPI.follow(userId)
    .then(data => {
      if(data.resultCode == 0) {
        dispatch(followSucces(userId))
      }
      dispatch(toggleFollowingProgress(false, userId))
    });
  }
}





export default usersReducer;