import React from "react";
import s from './../Dialogs.module.css'

const MessageItem = (props) => {
  // let className = {s.myMessage}
  // if (props.user.author !== "me") {
  //   className = {s.friendMessage}
  // }
  return (
    
    <div className={props.user.author !== "me" ? s.friendMessage : s.moveRight}>
      <div className={s.circul}></div>
      <div className={s.textMessage}>
      {props.user.message}  {props.user.likesCount}
      </div>
    </div>

  
  )
}

export default MessageItem;