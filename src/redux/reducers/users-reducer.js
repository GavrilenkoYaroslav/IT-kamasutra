import {UsersAPI} from "../../API/API";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const PAGE_CHANGE = 'PAGE_CHANGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS';


let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};


const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state, users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: true};
                    }
                    return user;
                })
            };
        case UNFOLLOW:
            return {
                ...state, users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: false};
                    }
                    return user;
                })
            };
        case SET_USERS:
            return {...state, users: [...action.users]};
        case PAGE_CHANGE:
            return {...state, currentPage: action.page};
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.usersCount};
        case TOGGLE_FETCHING:
            return {...state, isFetching: action.isFetching};
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.inProgress ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;

    }
};

export const toggleFollowingInProgress = (inProgress, userId) => {
    return {
        type: TOGGLE_FOLLOWING_IN_PROGRESS,
        inProgress,
        userId
    }
};

export const toggleFetching = (isFetching) => {
    return {
        type: TOGGLE_FETCHING,
        isFetching
    }
};

export const setTotalUsersCount = (usersCount) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        usersCount
    }
};

export const changePage = (page) => {
    return {
        type: PAGE_CHANGE,
        page
    }
};

export const followAction = (userId) => {
    return {
        type: FOLLOW,
        userId
    }
};

export const unfollowAction = (userId) => {
    return {
        type: UNFOLLOW,
        userId
    }
};

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
};

export const getUsers = (currentPage, pageSize) => async dispatch => {
    dispatch(toggleFetching(true));
    try {
        const data = await UsersAPI.getUsers(currentPage, pageSize);
        dispatch(toggleFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    } catch (e) {
        console.error(e)
    }
};

export const pageChange = (p, pageSize) => async dispatch => {
    dispatch(toggleFetching(true));
    dispatch(changePage(p));
    try {
        const data = await UsersAPI.getUsers(p, pageSize);
        dispatch(setUsers(data.items));
    } catch (e) {
        console.error(e)
    } finally {
        dispatch(toggleFetching(false));
    }
};

export const follow = (id) => async dispatch => {
    dispatch(toggleFollowingInProgress(true, id));
    try {
        const data = await UsersAPI.followUser(id);
        if (data.resultCode === 0) {
            dispatch(followAction(id));
        }
    } catch (e) {
        console.error(e)
    } finally {
        dispatch(toggleFollowingInProgress(false, id))
    }
};

export const unfollow = (id) => async dispatch => {
    dispatch(toggleFollowingInProgress(true, id));
    try {
        const data = await UsersAPI.unfollowUser(id);
        if (data.resultCode === 0) {
            dispatch(unfollowAction(id))
        }
    } catch (e) {
        console.error(e)
    } finally {
        dispatch(toggleFollowingInProgress(false, id))
    }
};


export default usersReducer;