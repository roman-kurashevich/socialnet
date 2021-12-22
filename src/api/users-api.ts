import { GetItemsType, instance, APIResponseType } from "./api";

export const userAPI = {
  getUsers(
    currentPage = 1,
    pageSize = 10,
    term: string = "",
    friend: null | boolean = null
  ) {
    return instance
      .get<GetItemsType>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` +
          (friend === null ? "" : `&friend=${friend}`)
      )
      .then((response) => response.data);
  },
  follow(id: number) {
    return instance
      .post<APIResponseType>(`follow/${id}`)
      .then((res) => res.data);
  },
  unfollow(id: number) {
    return instance
      .delete(`follow/${id}`)
      .then((res) => res.data) as Promise<APIResponseType>;
  },
};
