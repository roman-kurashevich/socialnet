import { FormAction, stopSubmit } from "redux-form";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { ResultCodeForCaptcha, ResultCodesEnum } from "../api/api";
import { InferActionsTypes, BaseThunkType } from "./reduxStore";

let initialState = {
  id: null as null | number,
  email: null as null | string,
  login: null as null | string,
  isFetching: false,
  isAuth: false,
  captchaUrl: null as null | string,
};

const authReducer = (
  state: initialStateType = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case "authReducer/GET_CAPTCHA_URL_SUCCESS":
    case "authReducer/SET_USER_DATA":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const actions = {
  setUserData: (
    id: null | number,
    email: null | string,
    login: null | string,
    isAuth: boolean
  ) =>
    ({
      type: "authReducer/SET_USER_DATA",
      payload: { id, email, login, isAuth },
    } as const),

  setIsFetching: (isFetching: boolean) =>
    ({
      type: "authReducer/TOGGLE_IS_FETCHING",
      isFetching,
    } as const),

  getCaptchaUrlSuccess: (captchaUrl: null | string) =>
    ({
      type: "authReducer/GET_CAPTCHA_URL_SUCCESS",
      payload: { captchaUrl },
    } as const),
};

export const getAuthUserData = (): ThunkType => {
  return async (dispatch, getState) => {
    let data = await authAPI.me();
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(
        actions.setUserData(
          data.data.id,
          data.data.email,
          data.data.login,
          true
        )
      );
    }
  };
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captchaUrl: string | null
): ThunkType => {
  return async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captchaUrl);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      let message = data.messages.length > 0 ? data.messages[0] : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  };
};
export const logout = (): ThunkType => {
  return async (dispatch, getState) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setUserData(null, null, null, false));
    }
  };
};

export const getCaptchaUrl = (): ThunkType => {
  return async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;

    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
  };
};

export default authReducer;

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;
