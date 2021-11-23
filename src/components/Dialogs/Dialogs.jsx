import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./Message/Message";
import s from './Dialogs.module.css';
import {Field, reduxForm, reset} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const Dialogs = (props) => {

  let users = [];
  props.dialogsData.forEach((item) => {
    users.push(<DialogItem user={item} key={item.id}/>);
  })

  let messages = [];
  props.messagesData.forEach((item, index) => {
    messages.push(<MessageItem user={item} key={index}/>);
  })

  let addNewMessage = (values, dispatch) => {
    console.log(values.newMessageBody);
    props.sendMessage(values.newMessageBody);
    dispatch(reset("sendMessage"))
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
  // return (
  //   <div className={s.dialogs}>
  //     <div className={s.dialogsItems}>
  //       {users}
  //     </div>
  //     <div className={s.messages}>
  //       {messages}
  //       <textarea 
  //         value={props.newMessageText}
  //         onChange={onChangeMessage}
  //         className={s.textarea + ' ' + s.moveRight} 
  //         placeholder='write your message'
  //       />
  //       <div className={s.moveRight}>
  //         <button onClick={onSendMessage}>send</button>
  //       </div>
  //     </div>
  //   </div>
  // )
}

const maxLength12 = maxLengthCreator(12)

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field 
          component={Textarea} 
          name={'newMessageBody'} 
          placeholder='write your message'
          validate={[required, maxLength12]}
        />
      </div>
      <div>
        <button>send</button>
      </div>
    </form>
  )
}

const AddMessageFormRedux = reduxForm({form: 'sendMessage'})(AddMessageForm)

export default Dialogs