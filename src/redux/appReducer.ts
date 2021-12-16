import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./authReducer";
import { AppStateType, InferActionsTypes } from "./reduxStore";

let initialState = {
  initialized: false,
  globalError: null as null | string,
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "appReducer/INITIALIZED_SUCCESS":
      return {
        ...state,
        initialized: true,
      };

    case "appReducer/SET_GLOBAL_ERROR":
      return {
        ...state,
        globalError: action.errorMessage,
      };

    default:
      return state;
  }
};

export const actions = {
  initializedSuccess: () =>
    ({
      type: "appReducer/INITIALIZED_SUCCESS",
    } as const),

  setGlobalErrorAction: (errorMessage: any) =>
    ({
      type: "appReducer/SET_GLOBAL_ERROR",
      errorMessage: errorMessage,
    } as const),
};

export const initializedApp = (): ThunkAction<
  void,
  AppStateType,
  unknown,
  ActionsTypes
> => {
  return (dispatch) => {
    let propmise = dispatch(getAuthUserData());
    // let promise2 = dispatch(somethingElse())
    // let promise3 = dispatch(somethingElse())
    Promise.all([propmise]).then(() => {
      dispatch(actions.initializedSuccess());
    });
  };
};
export const setGlobalError = (
  error: any
): ThunkAction<void, AppStateType, unknown, ActionsTypes> => {
  return (dispatch) => {
    dispatch(actions.setGlobalErrorAction(error.reason.message));
  };
};

export const clearGlobalError = (): ThunkAction<
  void,
  AppStateType,
  unknown,
  ActionsTypes
> => {
  return (dispatch) => {
    dispatch(actions.setGlobalErrorAction(null));
  };
};

export default appReducer;
