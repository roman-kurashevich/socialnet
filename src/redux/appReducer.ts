import { getAuthUserData } from "./authReducer";

const INITIALIZED_SUCCESS = "appReducer/INITIALIZED_SUCCESS";
const SET_GLOBAL_ERROR = "appReducer/SET_GLOBAL_ERROR";

export type InitialStateType = {
  initialized: boolean;
  globalError: null | string;
};

let initialState: InitialStateType = {
  initialized: false,
  globalError: null,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    case SET_GLOBAL_ERROR:
      return {
        ...state,
        globalError: action.errorMessage,
      };

    default:
      return state;
  }
};

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
};
export const initializedSuccess = (): InitializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS,
});

type SetGlobalErrorActionType = {
  type: typeof SET_GLOBAL_ERROR;
  errorMessage: null | string;
};

export const setGlobalErrorAction = (
  errorMessage: null | string
): SetGlobalErrorActionType => ({
  type: SET_GLOBAL_ERROR,
  errorMessage: errorMessage,
});

export const initializedApp = () => {
  return (dispatch: any) => {
    let propmise = dispatch(getAuthUserData());
    // let promise2 = dispatch(somethingElse())
    // let promise3 = dispatch(somethingElse())
    Promise.all([propmise]).then(() => {
      dispatch(initializedSuccess());
    });
  };
};
export const setGlobalError = (error: any) => {
  return (dispatch: any) => {
    dispatch(setGlobalErrorAction(error.reason.message));
  };
};
export const clearGlobalError = () => {
  return (dispatch: any) => {
    dispatch(setGlobalErrorAction(null));
  };
};

export default appReducer;
