import { profileAPI, userAPI } from '../api/api'

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_USER_STATUS';

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

export const getUserProfile = (userId) => {
  return (dispatch) => {
    userAPI.getProfile(userId)
    .then(data => {
      dispatch(setUserProfile(data))
    })
  }
}
export const getStatus = (userId) => {
  return (dispatch) => {
    profileAPI.getStatus(userId)
    .then(response => {
      dispatch(setStatus(response.data))
    })
  }
}
export const updateStatus = (status) => {
  return (dispatch) => {
    profileAPI.updateStatus(status)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
      }
    })
  }
}

export default profileReducer;