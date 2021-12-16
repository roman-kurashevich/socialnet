import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./Message/Message";
import s from './Dialogs.module.css';
// import { DialogType, MessageType } from "../../redux/dialogsReducer";
import AddMessageFormRedux from "./AddMessageForm";
import { reset } from "redux-form";
import { DialogType, MessageType } from "../../types/types";


type MapStateToPropsType = {
  dialogsData: Array<DialogType>
  messagesData: Array<MessageType>
}
type MapDispatchToPropsType = {
  sendMessage: (newMessageBody: string) => void;
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

export type NewMessageFormValuesType = {
  newMessageBody: string,
}

const Dialogs: React.FC<PropsType> = (props) => {

  let users: Array<JSX.Element> = [];
  props.dialogsData.forEach((item) => {
    users.push(<DialogItem user={item} key={item.id}/>);
  })

  let messages: Array<JSX.Element> = [];
  props.messagesData.forEach((item, index) => {
    messages.push(<MessageItem user={item} key={index}/>);
  })

  let addNewMessage = (values: NewMessageFormValuesType, dispatch: any) => {
    props.sendMessage(values.newMessageBody);
    dispatch(reset("sendMessage"));
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {users}
      </div>
      <div className={s.messages}>
        {messages}
        <AddMessageFormRedux onSubmit={addNewMessage}/>
      </div>
    </div>
  )
}

export default Dialogs