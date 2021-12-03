import { userAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

import { UserType } from "../../src/types/types";

const FOLLOW = "usersReducer/FOLLOW";
const UNFOLLOW = "usersReducer/UNFOLLOW";
const SET_USERS = "usersReducer/SET_USERS";
const SET_CURRENT_PAGE = "usersReducer/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "usersReducer/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "usersReducer/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS =
  "usersReducer/TOGGLE_IS_FOLLOWING_PROGRESS";
const SET_PORTION_OF_PAGES_NUMBER = "usersReducer/SET_PORTION_OF_PAGES_NUMBER";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 3,
  isFetching: true,
  followingProgress: [] as Array<number>, // array of users id
  portionOfPagesNumber: 1,
};

type InitialState = typeof initialState;

const usersReducer = (
  state: InitialState = initialState,
  action: any
): InitialState => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };

    case SET_USERS:
      return { ...state, users: [...action.users] };

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };

    case SET_PORTION_OF_PAGES_NUMBER:
      return { ...state, portionOfPagesNumber: action.portionNumber };

    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.totalUsersCount };

    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };

    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingProgress: action.isFetching
          ? [...state.followingProgress, action.userId]
          : state.followingProgress.filter((id) => id != action.userId),
      };

    default:
      return state;
  }
};

type FollowSuccesType = {
  type: typeof FOLLOW;
  userId: number;
};
export const followSucces = (userId: number): FollowSuccesType => ({
  type: FOLLOW,
  userId,
});

type UnfollowSuccesType = {
  type: typeof UNFOLLOW;
  userId: number;
};
export const unfollowSucces = (userId: number): UnfollowSuccesType => ({
  type: UNFOLLOW,
  userId,
});

type SetUsersType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};
export const setUsers = (users: Array<UserType>): SetUsersType => ({
  type: SET_USERS,
  users,
});

type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type SetPortionOfPagesNumberType = {
  type: typeof SET_PORTION_OF_PAGES_NUMBER;
  portionNumber: number;
};
export const setPortionOfPagesNumber = (
  portionNumber: number
): SetPortionOfPagesNumberType => ({
  type: SET_PORTION_OF_PAGES_NUMBER,
  portionNumber,
});

type SetTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalUsersCount: number;
};
export const setTotalUsersCount = (
  totalUsersCount: number
): SetTotalUsersCountType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});

type SetIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export const setIsFetching = (isFetching: boolean): SetIsFetchingType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type ToggleFollowingProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};
export const toggleFollowingProgress = (
  isFetching: boolean,
  userId: number
): ToggleFollowingProgressType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

export const requestUsers = (currentPage: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(setIsFetching(true));
    let data = await userAPI.getUsers(currentPage, pageSize);
    dispatch(setIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(setCurrentPage(currentPage)); // ?
    return data;
  };
};

const followUnfollowFlow = async (
  dispatch: any,
  userId: number,
  apiMethod: any,
  actionCreator: any
) => {
  dispatch(toggleFollowingProgress(true, userId)); // дисэйблим кнопку

  let response = await apiMethod(userId);

  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }

  dispatch(toggleFollowingProgress(false, userId));
};

export const unfollow = (userId: number) => {
  return async (dispatch: any) => {
    followUnfollowFlow(
      dispatch,
      userId,
      userAPI.unfollow.bind(userAPI),
      unfollowSucces
    );
  };
};

export const follow = (userId: number) => {
  return async (dispatch: any) => {
    followUnfollowFlow(
      dispatch,
      userId,
      userAPI.follow.bind(userAPI),
      followSucces
    );
  };
};

export default usersReducer;
