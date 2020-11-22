import {resultCodes} from "../../API/API";
import {PhotosType} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";
import {UsersAPI} from "../../API/UsersAPI";


export const FOLLOW = 'users_reducer/FOLLOW';
export const UNFOLLOW = 'users_reducer/UNFOLLOW';
const SET_USERS = 'users_reducer/SET_USERS';
const SET_TOTAL_USERS_COUNT = 'users_reducer/SET_TOTAL_USERS_COUNT';
const TOGGLE_FETCHING = 'users_reducer/TOGGLE_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'users_reducer/TOGGLE_FOLLOWING_IN_PROGRESS';

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

type InitialUsersState = {
    users: Array<UserType>
    totalUsersCount: number
    isFetching: boolean
    followingInProgress: Array<number>
}

const initialState: InitialUsersState = {
    users: [],
    totalUsersCount: 0,
    isFetching: false,
    followingInProgress: []
};


const usersReducer = (state = initialState, action: ActionsTypes) => {

    switch (action.type) {
        case SET_USERS:
            return {...state, users: [...action.users]};
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
    SetTotalUsersCountType | FollowActionType |
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
        isFetching: isFetching
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


export type FollowActionType = {
    type: typeof FOLLOW
    user: UserType
}

export const followAction = (user: UserType): FollowActionType => {
    return {
        type: FOLLOW,
        user
    }
};

export type UnfollowActionType = {
    type: typeof UNFOLLOW
    user: UserType
}


export const unfollowAction = (user: UserType): UnfollowActionType => {
    return {
        type: UNFOLLOW,
        user
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

export const getUsers = (currentPage: number, pageSize: number,friend?: boolean, term?: string): ThunkType => async dispatch => {
    dispatch(toggleFetching(true));
    try {
        const data = await UsersAPI.getUsers(currentPage, pageSize, friend, term);
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    } catch (e) {
        console.error(e)
    } finally {
        dispatch(toggleFetching(false));
    }
};

export const follow = (user: UserType): ThunkType => async dispatch => {
    dispatch(toggleFollowingInProgress(true, user.id));
    try {
        const data = await UsersAPI.followUser(user.id);
        if (data.resultCode === resultCodes.Success) {
            user.followed = true;
            dispatch(followAction(user));
        }
    } catch (e) {
        console.error(e)
    } finally {
        dispatch(toggleFollowingInProgress(false, user.id))
    }
};

export const unfollow = (user: UserType): ThunkType => async dispatch => {
    dispatch(toggleFollowingInProgress(true, user.id));
    try {
        const data = await UsersAPI.unfollowUser(user.id);
        if (data.resultCode === resultCodes.Success) {
            user.followed = false;
            dispatch(unfollowAction(user))
        }
    } catch (e) {
        console.error(e)
    } finally {
        dispatch(toggleFollowingInProgress(false, user.id))
    }
};


export default usersReducer;