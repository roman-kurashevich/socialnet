import React from "react";
import { connect } from "react-redux";
import {sendMessageActionCreator} from '../../redux/dialogsReducer'
import Dialogs from "./Dialogs";
import withAuthRedirect from '../../hoc/withAuthRedirect'
import { compose } from "redux";

//пример использования контекста до внедрения redux provider

// const DialogsContainer = () => {

  
//   return (
//     <StoreContext.Consumer> 
//       { (store) => {
        
        
//         let sendMessage = () => {
//           let action = sendMessageActionCreator();
//           store.dispatch(action)
//         }
      
//         let onChangeMessage = (text) => {
//           let action = updateNewMessageTextActionCreator(text);
//           store.dispatch(action);
//         }

//         return (
//           <Dialogs 
//           sendMessage={sendMessage} 
//           onChangeMessage={onChangeMessage}
//           newMessageText={store.getState().messagesPage.newMessageText}
//           dialogsData={store.getState().messagesPage.dialogsData}
//           messagesData={store.getState().messagesPage.messagesData}
//           />

//         )
//       }
//     }
//     </StoreContext.Consumer>
//   )
// }

//Ниже способ с использованием библиотеки React Redux

// let AuthRedirectComponent = withAuthRedirect(Dialogs)

let mapStateToProps = (state) => {
  return {
    newMessageText: state.messagesPage.newMessageText,
    dialogsData: state.messagesPage.dialogsData,
    messagesData: state.messagesPage.messagesData,

  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(sendMessageActionCreator(newMessageBody))
    },
  }
}

export default compose(
connect(mapStateToProps,mapDispatchToProps),
withAuthRedirect
)(Dialogs)