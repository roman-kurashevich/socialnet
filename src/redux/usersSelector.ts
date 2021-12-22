import { createSelector } from "reselect";
import { UserType } from "../types/types";
import { AppStateType } from "./reduxStore";

export const getUsersSelector = (state: AppStateType) => {
  return state.usersPage.users;
};

export const getUsers = createSelector(
  getUsersSelector,
  (users: Array<UserType>) => {
    return users.filter((u) => true);
  }
);

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};
export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
};
export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};
export const getPortionOfPagesNumber = (state: AppStateType) => {
  return state.usersPage.portionOfPagesNumber;
};
export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};
export const getFollowingProgress = (state: AppStateType) => {
  return state.usersPage.followingProgress;
};
export const getFilter = (state: AppStateType) => {
  return state.usersPage.filter;
};
