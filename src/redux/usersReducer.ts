import { userAPI } from "../api/users-api";
import { updateObjectInArray } from "../utils/object-helpers";
import { UserType } from "../../src/types/types";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";
import { Dispatch } from "redux";
import { FormAction } from "redux-form";
import { APIResponseType, ResultCodesEnum } from "../api/api";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 3,
  isFetching: true,
  followingProgress: [] as Array<number>, // array of users id
  portionOfPagesNumber: 1,
};

const usersReducer = (
  state: InitialState = initialState,
  action: ActionsType
): InitialState => {
  switch (action.type) {
    case "usersReducer/FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };

    case "usersReducer/UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };

    case "usersReducer/SET_USERS":
      return { ...state, users: [...action.users] };

    case "usersReducer/SET_CURRENT_PAGE":
      return { ...state, currentPage: action.currentPage };

    case "usersReducer/SET_PORTION_OF_PAGES_NUMBER":
      return { ...state, portionOfPagesNumber: action.portionNumber };

    case "usersReducer/SET_TOTAL_USERS_COUNT":
      return { ...state, totalUsersCount: action.totalUsersCount };

    case "usersReducer/TOGGLE_IS_FETCHING":
      return { ...state, isFetching: action.isFetching };

    case "usersReducer/TOGGLE_IS_FOLLOWING_PROGRESS":
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

export const actions = {
  followSucces: (userId: number) =>
    ({ type: "usersReducer/FOLLOW", userId } as const),
  unfollowSucces: (userId: number) =>
    ({ type: "usersReducer/UNFOLLOW", userId } as const),
  setUsers: (users: Array<UserType>) =>
    ({ type: "usersReducer/SET_USERS", users } as const),
  setCurrentPage: (currentPage: number) =>
    ({
      type: "usersReducer/SET_CURRENT_PAGE",
      currentPage,
    } as const),
  setPortionOfPagesNumber: (portionNumber: number) =>
    ({
      type: "usersReducer/SET_PORTION_OF_PAGES_NUMBER",
      portionNumber,
    } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: "usersReducer/SET_TOTAL_USERS_COUNT",
      totalUsersCount,
    } as const),
  setIsFetching: (isFetching: boolean) =>
    ({
      type: "usersReducer/TOGGLE_IS_FETCHING",
      isFetching,
    } as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: "usersReducer/TOGGLE_IS_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const),
};

export const requestUsers = (
  currentPage: number,
  pageSize: number
): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.setIsFetching(true));
    let data = await userAPI.getUsers(currentPage, pageSize);
    dispatch(actions.setIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.setCurrentPage(currentPage)); // ?
    // return data;
  };
};

//Другой способ типизации Thunk
const _followUnfollowFlow = async (
  dispatch: Dispatch<ActionsType>,
  userId: number,
  apiMethod: (userId: number) => Promise<APIResponseType>,
  actionCreator: (userId: number) => ActionsType
) => {
  dispatch(actions.toggleFollowingProgress(true, userId)); // дисэйблим кнопку

  let data = await apiMethod(userId);
  if (data.resultCode == 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      userAPI.follow.bind(userAPI),
      actions.followSucces
    );
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      userAPI.unfollow.bind(userAPI),
      actions.unfollowSucces
    );
  };
};

export default usersReducer;

export type InitialState = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;
