import {resultCodes} from "../../API/API";
import {stopSubmit} from "redux-form";
import {PhotosType, ProfileType} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";
import {DescriptionFormDataType} from "../../components/Profile/Profile-info/DescriptionForm";
import {ProfileAPI} from "../../API/ProfileAPI";
import {AuthAPI} from "../../API/AuthAPI";
import {FOLLOW, FollowActionType, UNFOLLOW, UnfollowActionType, UserType} from "./users-reducer";

export const SET_PHOTO = 'profile_reducer/SET_PHOTO';
const CLEAR_PROFILE = 'profile_reducer/CLEAR_PROFILE';
const ADD_POST = 'profile_reducer/ADD_POST';
const SET_USER_PROFILE = 'profile_reducer/SET_USER_PROFILE';
const SET_STATUS = 'profile_reducer/SET_STATUS';
const TOGGLE_FETCHING = 'profile_reducer/TOGGLE_FETCHING';
const SET_USER_FRIENDS = 'profile_reducer/SET_USER_FRIENDS';

export type PostType = {
    id: number
    post: string
    likesCount: number
}

type InitialProfileState = typeof initialState;

const initialState = {
    postData: [
        {id: 1, post: 'Hi, how are you?', likesCount: 9},
        {id: 2, post: 'Working hard.', likesCount: 15}
    ] as Array<PostType>,
    profile: null as ProfileType|null,
    userFriends: [] as Array<UserType>,
    status: '',
    isProfileFetching: false,
};

const profileReducer = (state = initialState, action: ActionsTypes): InitialProfileState => {

    switch (action.type) {
        case ADD_POST: {
            let postId = state.postData.length + 1;
            let newPost = {
                id: postId,
                post: action.post,
                likesCount: 0
            };
            return {...state, postData: [newPost, ...state.postData]};
        }
        case FOLLOW: {
            return {...state, userFriends: [...state.userFriends, action.user]}
        }
        case UNFOLLOW: {
            const index = state.userFriends.findIndex(user => user.id === action.user.id);
            if ( index === -1 ) {return state}
            return {...state, userFriends: [...state.userFriends.slice(0,index), ...state.userFriends.slice(index+1)]}
        }
        case TOGGLE_FETCHING: {
            return {...state, isProfileFetching: action.isProfileFetching};
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case CLEAR_PROFILE: {
            return {...state, profile: null}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case SET_PHOTO: {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        case SET_USER_FRIENDS: {
            return {...state, userFriends: action.friends}
        }
        default:
            return state;
    }

};

type ActionsTypes = ToggleFetchingType | SetStatusActionType | SetUserProfileActionType |
    AddPostActionType | ClearProfileActionType | SetPhotoActionType | SetUserFriends |
    FollowActionType | UnfollowActionType;

type SetUserFriends = {
    type: typeof SET_USER_FRIENDS
    friends: Array<UserType>
}

export const setUserFriends = (friends: Array<UserType>):SetUserFriends => {
    return {
        type: SET_USER_FRIENDS,
        friends
    }
};

type ToggleFetchingType = {
    type: typeof TOGGLE_FETCHING
    isProfileFetching: boolean
}

export const toggleFetching = (isProfileFetching: boolean): ToggleFetchingType => {
    return {
        type: TOGGLE_FETCHING,
        isProfileFetching: isProfileFetching
    }
};

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}

export const setStatusAC = (status: string): SetStatusActionType => {
    return {type: SET_STATUS, status}
};

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType|null
}

export const setUserProfile = (profile: ProfileType|null): SetUserProfileActionType => {
    return {type: SET_USER_PROFILE, profile}
};

type AddPostActionType = {
    type: typeof ADD_POST
    post: string
}

export const addPostActionCreator = (post: string): AddPostActionType => {
    return {type: ADD_POST, post};
};

type ClearProfileActionType = {
    type: typeof CLEAR_PROFILE
}

export const clearProfile = (): ClearProfileActionType => {
    return {type: CLEAR_PROFILE};
};

export type SetPhotoActionType = {
    type: typeof SET_PHOTO
    photos: PhotosType
}

export const setPhoto = (photos: PhotosType): SetPhotoActionType => {
    return {type: SET_PHOTO, photos}
};


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserProfile = (userId: number): ThunkType => async dispatch => {
    dispatch(toggleFetching(true));
    try {
        const data: ProfileType = await ProfileAPI.getProfile(userId);
        dispatch(setUserProfile(data));
        dispatch(getUserStatus(userId));
    } catch (e) {
        console.error(e)
    } finally {
        dispatch(toggleFetching(false))
    }
};

export const getMyProfile = (): ThunkType => async dispatch => {
    try {
        const data = await AuthAPI.AuthMe();
        if (data.resultCode === resultCodes.Success) {
            dispatch(getUserProfile(data.data.id));
        }
    } catch (e) {
        console.error(e)
    }
};

export const getUserStatus = (userId: number): ThunkType => async dispatch => {
    try {
        const data = await ProfileAPI.getStatus(userId);
        dispatch(setStatusAC(data));
    } catch (e) {
        console.error(e)
    }
};


export const savePhoto = (file: File): ThunkType => async dispatch => {
  try {
     const data = await ProfileAPI.savePhoto(file);
     dispatch(setPhoto(data.data.photos));
  }  catch (e){
      console.error(e)
  }
};

export const saveProfile = (data: DescriptionFormDataType): ThunkType => async dispatch => {
    try{
        const res = await ProfileAPI.saveProfile(data);
        if (res.resultCode === resultCodes.Success)
            return dispatch(getMyProfile());
        const message = res.messages.length > 0 ? res.messages[0] : 'some error';
        dispatch(stopSubmit('description', { _error: message }));
    } catch (e) {
        console.error(e)
    }
};

export default profileReducer;