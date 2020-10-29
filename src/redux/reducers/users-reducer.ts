import {resultCodes, UsersAPI} from "../../API/API";
import {PhotosType} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const PAGE_CHANGE = 'PAGE_CHANGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS';

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

type InitialUsersState = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

const initialState: InitialUsersState = {
    users: [],
    pageSize: 16,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};


const usersReducer = (state = initialState, action: ActionsTypes) => {

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

type ActionsTypes = ToggleFollowingInProgressType | ToggleFetchingType |
    SetTotalUsersCountType | ChangePageType | FollowActionType |
    UnfollowActionType | SetUsersType;

type ToggleFollowingInProgressType = {
    type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
    inProgress: boolean
    userId: number
}

export const toggleFollowingInProgress = (inProgress: boolean, userId: number): ToggleFollowingInProgressType => {
    return {
        type: TOGGLE_FOLLOWING_IN_PROGRESS,
        inProgress,
        userId
    }
};

type ToggleFetchingType = {
    type: typeof TOGGLE_FETCHING
    isFetching: boolean
}

export const toggleFetching = (isFetching: boolean): ToggleFetchingType => {
    return {
        type: TOGGLE_FETCHING,
        isFetching
    }
};

type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    usersCount: number
}

export const setTotalUsersCount = (usersCount: number): SetTotalUsersCountType => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        usersCount
    }
};

type ChangePageType = {
    type: typeof PAGE_CHANGE
    page: number
}

export const changePage = (page: number): ChangePageType => {
    return {
        type: PAGE_CHANGE,
        page
    }
};

type FollowActionType = {
    type: typeof FOLLOW
    userId: number
}

export const followAction = (userId: number): FollowActionType => {
    return {
        type: FOLLOW,
        userId
    }
};

type UnfollowActionType = {
    type: typeof UNFOLLOW
    userId: number
}


export const unfollowAction = (userId: number): UnfollowActionType => {
    return {
        type: UNFOLLOW,
        userId
    }
};

type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}

export const setUsers = (users: Array<UserType>): SetUsersType => {
    return {
        type: SET_USERS,
        users
    }
};


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const getUsers = (currentPage: number, pageSize: number): ThunkType => async dispatch => {
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

export const pageChange = (p: number, pageSize: number): ThunkType => async dispatch => {
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


export const follow = (id: number): ThunkType => async dispatch => {
    dispatch(toggleFollowingInProgress(true, id));
    try {
        const data = await UsersAPI.followUser(id);
        if (data.resultCode === resultCodes.Success) {
            dispatch(followAction(id));
        }
    } catch (e) {
        console.error(e)
    } finally {
        dispatch(toggleFollowingInProgress(false, id))
    }
};

export const unfollow = (id: number): ThunkType => async dispatch => {
    dispatch(toggleFollowingInProgress(true, id));
    try {
        const data = await UsersAPI.unfollowUser(id);
        if (data.resultCode === resultCodes.Success) {
            dispatch(unfollowAction(id))
        }
    } catch (e) {
        console.error(e)
    } finally {
        dispatch(toggleFollowingInProgress(false, id))
    }
};


export default usersReducer;