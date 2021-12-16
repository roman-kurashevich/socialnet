import React from "react";
import { connect } from "react-redux";
import { actions } from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/reduxStore";

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

let mapStateToProps = (state: AppStateType) => {
  return {
    dialogsData: state.messagesPage.dialogsData,
    messagesData: state.messagesPage.messagesData,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, {sendMessage: actions.sendMessage}),
  withAuthRedirect
)(Dialogs);
