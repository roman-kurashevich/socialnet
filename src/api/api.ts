import axios, { AxiosResponse } from "axios";
import { UserType } from "../types/types";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "78db3ef8-b9d0-41d5-9ed1-ce31346be1e0",
  },
});

// instance.interceptors.response.use((
//   (response) => {
//     return response;
//   },
//   (err) => {
//     debugger;
//     if (err.status === 401) {
//       // logout/redirect to main page, clear something
//     }

//     return err;
//   }
// ))

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10,
}

export type GetItemsType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};
