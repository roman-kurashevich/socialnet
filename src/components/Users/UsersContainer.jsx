import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import styles from "./Users.module.css"
import { 
  setCurrentPage,
  setPortionOfPagesNumber, 
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
  getPortionOfPagesNumber,
  getIsFetching,
  getFollowingProgress
} from '../../redux/usersSelector'
import Preloader from "../common/Preloader/Preloader";
import Users from "./Users";
import {withAuthRedirect} from '../../hoc/withAuthRedirect';


class UsersContainer extends React.Component {

  componentDidMount() {
    const {currentPage, pageSize} = this.props
    this.props.requestUsers(currentPage, pageSize)
  }

  onPageChanged = (pageNumber) => {
    const {pageSize} = this.props;
    this.props.requestUsers(pageNumber, pageSize);
    this.props.setCurrentPage(pageNumber); //?
  }
  
  render() {
    return (
      <div className={styles.usersContainer}>{
        this.props.isFetching ? <Preloader/> : null }
        <Users onPageChanged={this.onPageChanged}
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        portionOfPagesNumber={this.props.portionOfPagesNumber}
        setPortionOfPagesNumber={this.props.setPortionOfPagesNumber}
        users={this.props.users}
        followingProgress={this.props.followingProgress}
        toggleFollowingProgress={this.props.toggleFollowingProgress}
        unfollow={this.props.unfollow}
        follow={this.props.follow} 
        />
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    portionOfPagesNumber: getPortionOfPagesNumber(state),
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
      setPortionOfPagesNumber,
      toggleFollowingProgress,
      requestUsers,
      unfollow,
      follow,
    }),
  withAuthRedirect
)(UsersContainer)