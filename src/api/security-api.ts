import { APIResponseType, instance } from "./api";

type GetCaptchaUrlResponseDataType = {
  url: string;
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance
      .get<GetCaptchaUrlResponseDataType>("security/get-captcha-url")
      .then((resp) => resp.data);
  },
};
