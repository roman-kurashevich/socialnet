import React from "react";
import { MessageType } from "../../../types/types";
import s from './../Dialogs.module.css'

type PropsType = {
  user: MessageType
}

const MessageItem: React.FC<PropsType> = (props) => {
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