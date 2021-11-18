import { createSelector } from "reselect"

// export const getUsers = (state) => {
//   return state.usersPage.users.filter(u => true);
// }

//выше getUsers для демонстрации перересовки всего при каждом изменении в стейте

export const getUsersSelector = (state) => {
  return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter(u => true)
})

export const getPageSize = (state) => {
  return state.usersPage.pageSize
}
export const getTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state) => {
  return state.usersPage.currentPage
}
export const getPortionOfPagesNumber = (state) => {
  return state.usersPage.portionOfPagesNumber
}
export const getIsFetching = (state) => {
  return state.usersPage.isFetching
}
export const getFollowingProgress = (state) => {
  return state.usersPage.followingProgress
}