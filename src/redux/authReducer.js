import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../api/api'

const SET_USER_DATA = 'authReducer/SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'authReducer/TOGGLE_IS_FETCHING';
const GET_CAPTCHA_URL_SUCCESS = 'authReducer/GET_CAPTCHA_URL_SUCCESS';
// const SET_ERROR_MESSAGE = 'authReducer/SET_ERROR_MESSAGE';

let initialState = {
  id: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null,
  // errorMessage: null
  // profile: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_CAPTCHA_URL_SUCCESS:
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
        // isAuth: true,
      }

    // case SET_ERROR_MESSAGE:
    //   return {
    //     ...state,
    //     errorMessage: action.errorMessage,
    //     // isAuth: true,
    //   }
      
    default: 
      return state;
  }
}

export const setUserData = (id, email, login, isAuth) => ({type: SET_USER_DATA, payload: {id, email, login, isAuth}});
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});
// export const setErrorMessage = (errorMessage) => ({type: SET_ERROR_MESSAGE, errorMessage})

export const getAuthUserData = () => {
   return async (dispatch) => {
    let data = await authAPI.me()
      
    if (data.resultCode === 0) {
      dispatch(setUserData(data.data.id, data.data.email, data.data.login, true))
    }
  }
}
export const login = (email, password, rememberMe, captcha) => {
  return async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    // if(response.data.resultCode === 1) {
    //   dispatch(setErrorMessage(response.data.messages[0]))
    // }
    if(response.data.resultCode === 0) {
      // dispatch(setErrorMessage(null))
      dispatch(getAuthUserData())
    } else {
      if(response.data.resultCode === 10) {
        debugger
        dispatch(getCaptchaUrl())
      }

      let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
      dispatch(stopSubmit("login", {_error: message}));
      
    } 
  }
}
export const logout = () => {
  return async (dispatch) => {
    let response = await authAPI.logout()
    if(response.data.resultCode === 0) {
      dispatch(setUserData(null, null, null, false))
    }
  }
}

export const getCaptchaUrl = () => {
  return async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    debugger

    dispatch(getCaptchaUrlSuccess(captchaUrl))
  }
}


export default authReducer;