import { stopSubmit } from "redux-form";
import { profileAPI, userAPI } from "../api/api";
import { setGlobalErrorAction } from "./appReducer";

import { PhotosType, PostType, ProfileType } from "../../src/types/types";

const ADD_POST = "profileReducer/ADD-POST";
const SET_USER_PROFILE = "profileReducer/SET_USER_PROFILE";
const SET_STATUS = "profileReducer/SET_USER_STATUS";
const DELETE_POST = "profileReducer/DELETE_POST";
const SAVE_PHOTO_SUCCESS = "profileReducer/SAVE_PHOTO_SUCCESS";

let initialState = {
  postsData: [
    {
      id: 1,
      name: "Roma1",
      text: "blabla1",
      likes: 4,
      src: "https://trashbox.ru/ifiles/220798_004e6a_img_20140503_122504.jpg_min1/avatarki.-1.jpg",
    },
    {
      id: 2,
      name: "Roma2",
      text: "blabla2",
      likes: 34,
      src: "https://klike.net/uploads/posts/2019-03/1551511801_1.jpg",
    },
    {
      id: 3,
      name: "Roma3",
      text: "blabla3",
      likes: 2,
      src: "https://download-cs.net/steam/avatars/3408.jpg",
    },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
};

export type InitialStateType = typeof initialState;

const profileReducer = (
  state: InitialStateType = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        postsData: [
          ...state.postsData,
          {
            id: 4,
            name: "New",
            text: action.newPostText,
            likes: 0,
            src: "http://cs622426.vk.me/v622426834/409d/baLqspYwi84.jpg",
          },
        ],
      };

    case DELETE_POST:
      return {
        ...state,
        postsData: state.postsData.filter((p) => p.id !== action.postId),
      };

    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType, // так нельзя
      };

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };

    default:
      return state;
  }
};

type AddPostActionType = {
  type: typeof ADD_POST;
  newPostText: string;
};
export const addPostActionCreator = (
  newPostText: string
): AddPostActionType => ({
  type: ADD_POST,
  newPostText,
});

type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({
  type: SET_USER_PROFILE,
  profile,
});

type SetStatusType = {
  type: typeof SET_STATUS;
  status: string;
};
export const setStatus = (status: string): SetStatusType => ({
  type: SET_STATUS,
  status,
});

type DeletePostType = {
  type: typeof DELETE_POST;
  postId: number;
};
export const deletePost = (postId: number): DeletePostType => ({
  type: DELETE_POST,
  postId,
});

type SavePhotoSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

export const getUserProfile = (userId: number) => {
  return async (dispatch: any) => {
    let data = await userAPI.getProfile(userId);
    dispatch(setUserProfile(data));
  };
};

export const getStatus = (userId: number) => {
  return async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
  };
};

export const updateStatus = (status: string) => {
  return async (dispatch: any) => {
    try {
      let response = await profileAPI.updateStatus(status);
      if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
      }
    } catch (error: any) {
      debugger;
      dispatch(setGlobalErrorAction(error.message));
    }
  };
};

export const savePhoto = (file: any) => {
  return async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.data.photos));
    }
  };
};

export const saveProfile = (profile: ProfileType) => {
  return async (dispatch: any, getState: any) => {
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    } else {
      let message =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : "Some error";
      dispatch(stopSubmit("editProfile", { _error: message }));
      return Promise.reject(message);
    }
  };
};

export default profileReducer;
