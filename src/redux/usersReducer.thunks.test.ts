import { APIResponseType, ResultCodesEnum } from "../api/api";
import { userAPI } from "../api/users-api";
import { actions, follow, unfollow } from "./usersReducer";

jest.mock("../api/users-api"); // подменяем userAPI на фейковый

const userAPIMock = userAPI as jest.Mocked<typeof userAPI>;

const result: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
};

const getStateMock = jest.fn();
const dispatchMock = jest.fn();

beforeEach(() => {
  getStateMock.mockClear();
  dispatchMock.mockClear();
  userAPIMock.follow.mockClear();
  userAPIMock.unfollow.mockClear();
});

test("success follow thunk", async () => {
  userAPIMock.follow.mockReturnValue(Promise.resolve(result));
  const thunk = follow(1);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingProgress(true, 1)
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSucces(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowingProgress(false, 1)
  );
});

test("success unfollow thunk", async () => {
  userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
  const thunk = unfollow(3);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingProgress(true, 3)
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSucces(3));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowingProgress(false, 3)
  );
});
