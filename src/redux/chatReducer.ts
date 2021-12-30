import { FormAction, stopSubmit } from "redux-form";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { ResultCodeForCaptcha, ResultCodesEnum } from "../api/api";
import { InferActionsTypes, BaseThunkType } from "./reduxStore";
import { chatAPI, ChatMessageAPIType, StatusType } from "../api/chat-api";
import { Dispatch } from "react";
import { bindActionCreators } from "redux";
import { message } from "antd";
import { v1 } from "uuid";

let initialState = {
  messages: [] as ChatMessageType[],
  status: "pending" as StatusType,
};

export type ChatMessageType = ChatMessageAPIType & { id: string };

const chatReducer = (
  state = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case "chatReducer/MESSAGES_RECEIVED":
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.messages.map((m) => ({ ...m, id: v1() })),
        ].filter((m, index, array) => index >= array.length - 10),
      };
    case "chatReducer/STATUS_CHANGED":
      return {
        ...state,
        status: action.payload.status,
      };

    default:
      return state;
  }
};

export const actions = {
  messagesReceived: (messages: ChatMessageAPIType[]) =>
    ({
      type: "chatReducer/MESSAGES_RECEIVED",
      payload: { messages },
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: "chatReducer/STATUS_CHANGED",
      payload: { status },
    } as const),
};

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null =
  null;
const newMessageHandlerCreator = (dispatch: any) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};

let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: any) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return _statusChangedHandler;
};

export const startMessagesListening = (): ThunkType => {
  return async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe("messages-received", newMessageHandlerCreator(dispatch));
    chatAPI.subscribe("status-changed", statusChangedHandlerCreator(dispatch));
  };
};
export const stopMessagesListening = (): ThunkType => {
  return async (dispatch) => {
    chatAPI.unsubscribe(
      "messages-received",
      newMessageHandlerCreator(dispatch)
    );
    chatAPI.unsubscribe(
      "status-changed",
      statusChangedHandlerCreator(dispatch)
    );
    chatAPI.stop();
  };
};
export const sendMessage = (message: string): ThunkType => {
  return async (dispatch) => {
    chatAPI.sendMessage(message);
  };
};

export default chatReducer;

export type initialStateType = typeof initialState;

type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;
