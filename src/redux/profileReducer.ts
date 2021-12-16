import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../api/profile-api";
// import { actions } from "./appReducer";
import { PhotosType, PostType, ProfileType } from "../../src/types/types";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";
import { ResultCodesEnum } from "../api/api";

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

const profileReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "profileReducer/ADD_POST":
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

    case "profileReducer/DELETE_POST":
      return {
        ...state,
        postsData: state.postsData.filter((p) => p.id !== action.postId),
      };

    case "profileReducer/SAVE_PHOTO_SUCCESS":
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType, // так нельзя
      };

    case "profileReducer/SET_USER_PROFILE":
      return {
        ...state,
        profile: action.profile,
      };

    case "profileReducer/SET_STATUS":
      return {
        ...state,
        status: action.status,
      };

    default:
      return state;
  }
};

export const actions = {
  addPost: (newPostText: string) =>
    ({
      type: "profileReducer/ADD_POST",
      newPostText,
    } as const),

  setUserProfile: (profile: ProfileType) =>
    ({
      type: "profileReducer/SET_USER_PROFILE",
      profile,
    } as const),

  setStatus: (status: string) =>
    ({
      type: "profileReducer/SET_STATUS",
      status,
    } as const),

  deletePost: (postId: number) =>
    ({
      type: "profileReducer/DELETE_POST",
      postId,
    } as const),

  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: "profileReducer/SAVE_PHOTO_SUCCESS",
      photos,
    } as const),
};

export const getUserProfile = (userId: number | null): ThunkType => {
  return async (dispatch, getState) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
  };
};

export const getStatus = (userId: number): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
  };
};

export const updateStatus = (status: string): ThunkType => {
  return async (dispatch) => {
    try {
      let data = await profileAPI.updateStatus(status);
      if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setStatus(status));
      }
    } catch (error: any) {
      // dispatch(setGlobalErrorAction(error.message));
    }
  };
};

export const savePhoto = (file: File): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.savePhotoSuccess(data.data.photos));
    }
  };
};

export const saveProfile = (profile: ProfileType): ThunkType => {
  return async (dispatch, getState) => {
    const userId = getState().auth.id;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === ResultCodesEnum.Success) {
      if (userId != null) {
        dispatch(getUserProfile(userId));
      } else {
        throw new Error("userId can't be null");
      }
    } else {
      let message: string =
        data.messages.length > 0 ? data.messages[0] : "Some error";
      dispatch(stopSubmit("edit-profile", { _error: message }));
      return Promise.reject(message);
    }
  };
};

export default profileReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;
