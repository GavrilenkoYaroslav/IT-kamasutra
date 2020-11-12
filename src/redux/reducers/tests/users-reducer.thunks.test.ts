import {getUsers, setTotalUsersCount, setUsers, toggleFetching} from "../users-reducer";
import {UsersAPI} from "../../../API/UsersAPI";

jest.mock("../../../API/UsersAPI");
const UsersAPIMock = UsersAPI as jest.Mocked<typeof UsersAPI>;

const getUsersResponse = {
    items: [],
    totalCount: 10,
    error: null
};

UsersAPIMock.getUsers.mockReturnValue(Promise.resolve(getUsersResponse));

test('getUsers thunk work correctly', async () => {

    const dispatch = jest.fn();
    const getState = jest.fn();
    const getUsersThunk = getUsers(1, 10);


    await getUsersThunk(dispatch, getState, {});

    expect(dispatch).toBeCalledTimes(4);
    expect(dispatch).toHaveBeenNthCalledWith(1, toggleFetching(true));
    expect(dispatch).toHaveBeenNthCalledWith(2, setUsers([]));
    expect(dispatch).toHaveBeenNthCalledWith(3, setTotalUsersCount(10));
    expect(dispatch).toHaveBeenNthCalledWith(4, toggleFetching(false));
});