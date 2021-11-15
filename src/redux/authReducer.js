import { stopSubmit } from 'redux-form';
import { authAPI } from '../api/api'

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
// const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

let initialState = {
  id: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  // errorMessage: null
  // profile: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {

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
// export const setErrorMessage = (errorMessage) => ({type: SET_ERROR_MESSAGE, errorMessage})

export const getAuthUserData = () => {
  return (dispatch) => {
    return authAPI.me()
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(setUserData(data.data.id, data.data.email, data.data.login, true))
        }
      });
  }
}
export const login = (email, password, rememberMe) => {
  return (dispatch) => {
    
    authAPI.login(email, password, rememberMe)
    .then(response => {
      // if(response.data.resultCode === 1) {
      //   dispatch(setErrorMessage(response.data.messages[0]))
      // }
      if(response.data.resultCode === 0) {
        // dispatch(setErrorMessage(null))
        dispatch(getAuthUserData())
      } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
      }
    })
  }
}
export const logout = () => {
  return (dispatch) => {
    authAPI.logout()
    .then(response => {
      if(response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
      }
    })
  }
}

export default authReducer;