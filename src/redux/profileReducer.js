import {stopSubmit} from 'redux-form';
import {profileAPI, userAPI} from '../api/api'

const ADD_POST = 'profileReducer/ADD-POST';
const SET_USER_PROFILE = 'profileReducer/SET_USER_PROFILE';
const SET_STATUS = 'profileReducer/SET_USER_STATUS';
const DELETE_POST = 'profileReducer/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profileReducer/SAVE_PHOTO_SUCCESS';

let initialState = {
  postsData: [
    {id: 1, name: 'Roma1', text: 'blabla1', likes: 4, src: 'https://trashbox.ru/ifiles/220798_004e6a_img_20140503_122504.jpg_min1/avatarki.-1.jpg'},
    {id: 2, name: 'Roma2', text: 'blabla2', likes: 34, src: 'https://klike.net/uploads/posts/2019-03/1551511801_1.jpg'},
    {id: 3, name: 'Roma3', text: 'blabla3', likes: 2, src: 'https://download-cs.net/steam/avatars/3408.jpg'},
  ],
  profile: null,
  status: ''
}

const profileReducer = (state = initialState, action) => {

  switch (action.type) {
      
    case ADD_POST: 

      return {
        ...state,
        postsData: [...state.postsData, {
          id: 4,
          name: 'New',
          text: action.newPostText,
          likes: 0,
          src: 'http://cs622426.vk.me/v622426834/409d/baLqspYwi84.jpg'
        }]
      }

    case DELETE_POST: 

      return {
        ...state,
        postsData: state.postsData.filter(p => p.id !== action.postId)
      }

    case SAVE_PHOTO_SUCCESS: 

      return {
        ...state,
        profile: {...state.profile, photos: action.photos}
      }

    case SET_USER_PROFILE: 
      return {
        ...state,
        profile: action.profile
      }

    case SET_STATUS: 
      return {
        ...state,
        status: action.status
      }
    
    default: 
      return state;
  }
}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId) => {
  return async (dispatch) => {
    let data = await userAPI.getProfile(userId)
    dispatch(setUserProfile(data))
  }
}

export const getStatus = (userId) => {
  return async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data)) 
  }
}

export const updateStatus = (status) => {
  return async (dispatch) => { 
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status))
    }
  }
}

export const savePhoto = (file) => {
  return async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.data.photos))
    }
  }
}

export const saveProfile = (profile) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId))
    } else {
      let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
      dispatch(stopSubmit("editProfile", {_error: message}));
      return Promise.reject(message);
    }
  }
}

export default profileReducer;