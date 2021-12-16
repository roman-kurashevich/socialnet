import { PhotosType, ProfileType } from "../types/types";
import { instance, APIResponseType } from "./api";

type SavePhotoResponseDataType = {
  photos: PhotosType;
};

export const profileAPI = {
  getProfile(id: number | null) {
    return instance
      .get<ProfileType>(`profile/${id}`)
      .then((response) => response.data);
  },

  getStatus(id: number) {
    return instance.get<string>(`profile/status/${id}`).then((res) => res.data);
  },

  updateStatus(status: string) {
    return instance
      .put<APIResponseType>(`profile/status`, { status: status })
      .then((response) => response.data);
  },

  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance
      .put<APIResponseType<SavePhotoResponseDataType>>(
        "profile/photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => res.data);
  },

  saveProfile(profile: ProfileType) {
    return instance
      .put<APIResponseType>("profile", profile)
      .then((res) => res.data);
  },
};
