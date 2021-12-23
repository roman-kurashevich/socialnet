import React from "react";
import { useSelector } from "react-redux";
import styles from "./Users.module.css";
import {
  getIsFetching} from "../../redux/usersSelector";
import Preloader from "../common/Preloader/Preloader";
import {Users} from "./Users";


type UserPagePropsType = {
 // возможно будут какие-то ownProps
}

export const UsersPage: React.FC<UserPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching)
  return <>
      <div className={styles.usersContainer}>
        {isFetching ? <Preloader /> : null}
        <Users />
      </div>
  </>
}