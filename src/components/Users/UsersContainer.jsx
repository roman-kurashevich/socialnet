import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { 
  setCurrentPage, 
  toggleFollowingProgress,
  requestUsers,
  unfollow,
  follow,
} from "../../redux/usersReducer";
import {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingProgress
} from '../../redux/usersSelector'
import Preloader from "../common/Preloader/Preloader";
import Users from "./Users";
import {withAuthRedirect} from '../../hoc/withAuthRedirect'

class UsersContainer extends React.Component {

  componentDidMount() {
    const {currentPage, pageSize} = this.props
    this.props.requestUsers(currentPage, pageSize)
  }

  onPageChanged = (pageNumber) => {
    const {pageSize} = this.props;
    this.props.requestUsers(pageNumber, pageSize)
  }
  
  render() {
    console.log("RENDER users")
    return (
      <>{
        this.props.isFetching ? <Preloader/> : null }
        <Users onPageChanged={this.onPageChanged}
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        users={this.props.users}
        followingProgress={this.props.followingProgress}
        toggleFollowingProgress={this.props.toggleFollowingProgress}
        unfollow={this.props.unfollow}
        follow={this.props.follow} 
        />
      </>
    )
  }
}


let mapStateToProps = (state) => {
  console.log("mapStateToProps USERS")
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingProgress: getFollowingProgress(state),
  }
}
// let mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId) => {
//       dispatch(followAC(userId))
//     },
//     unfollow: (userId) => {
//       dispatch(unfollowAC(userId))
//     },
//     setUsers: (users) => {
//       dispatch(setUsersAC(users))
//     },
//     setCurrentPage: (currentPage) => {
//       dispatch(setCurrentPageAC(currentPage))
//     },
//     setTotalUsersCount: (totalUsersCount) => {
//       dispatch(setTotalUsersCountAC(totalUsersCount))
//     },
//     toggleIsFetching: (isFetching) => {
//       dispatch(setIsFetchingAC(isFetching))
//     }
//   }
// }

export default compose(
  connect(mapStateToProps, 
    {
      setCurrentPage,
      toggleFollowingProgress,
      requestUsers,
      unfollow,
      follow,
    }),
  withAuthRedirect
)(UsersContainer)
