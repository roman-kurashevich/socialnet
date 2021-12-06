import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "authReducer/SET_USER_DATA";
const TOGGLE_IS_FETCHING = "authReducer/TOGGLE_IS_FETCHING";
const GET_CAPTCHA_URL_SUCCESS = "authReducer/GET_CAPTCHA_URL_SUCCESS";

// export type initialStateType2 = {
//   id: null | number;
//   email: null | string;
//   login: null | string;
//   isFetching: boolean;
//   isAuth: boolean;
//   captchaUrl: null | string;
// };

let initialState = {
  id: null as null | number,
  email: null as null | string,
  login: null as null | string,
  isFetching: false,
  isAuth: false,
  captchaUrl: null as null | string,
};

export type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case GET_CAPTCHA_URL_SUCCESS:
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

type SetUserDataActionPayloadType = {
  id: null | number;
  email: null | string;
  login: null | string;
  isAuth: boolean;
};

type SetUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: SetUserDataActionPayloadType;
};

export const setUserData = (
  id: null | number,
  email: null | string,
  login: null | string,
  isAuth: boolean
): SetUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { id, email, login, isAuth },
});

type SetIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};

export const setIsFetching = (
  isFetching: boolean
): SetIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  payload: { captchaUrl: null | string };
};

export const getCaptchaUrlSuccess = (
  captchaUrl: null | string
): GetCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

export const getAuthUserData = () => {
  return async (dispatch: any) => {
    let data = await authAPI.me();

    if (data.resultCode === 0) {
      dispatch(
        setUserData(data.data.id, data.data.email, data.data.login, true)
      );
    }
  };
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captchaUrl: any
): any => {
  return async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captchaUrl);
    // if(response.data.resultCode === 1) {
    //   dispatch(setErrorMessage(response.data.messages[0]))
    // }
    if (response.data.resultCode === 0) {
      // dispatch(setErrorMessage(null))
      dispatch(getAuthUserData());
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }

      let message =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  };
};
export const logout = () => {
  debugger;
  return async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
      dispatch(setUserData(null, null, null, false));
    }
  };
};

export const getCaptchaUrl = () => {
  return async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;

    dispatch(getCaptchaUrlSuccess(captchaUrl));
  };
};

export default authReducer;
