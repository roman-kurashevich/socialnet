import React from "react";
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
  let path = `/dialogs/${props.user.id}`

  return (
    <div className={`${s.dialog}`}>
      <NavLink to={path} activeClassName={s.active}>{props.user.name}</NavLink>
    </div>
  )
}

export default DialogItem;