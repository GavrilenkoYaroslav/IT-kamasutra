import {AuthAPI, ProfileAPI} from "../../API/API";
import {stopSubmit} from "redux-form";
import {AuthMeResponseType, PhotosType, ProfileType} from "./auth-reducer";

export const SET_PHOTO = 'profile_reducer/SET_PHOTO';
const CLEAR_PROFILE = 'profile_reducer/CLEAR_PROFILE';
const ADD_POST = 'profile_reducer/ADD_POST';
const SET_USER_PROFILE = 'profile_reducer/SET_USER_PROFILE';
const SET_STATUS = 'profile_reducer/SET_STATUS';
const TOGGLE_FETCHING = 'profile_reducer/TOGGLE_FETCHING';

type PostType = {
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
    status: '',
    isFetching: false,
};

const profileReducer = (state = initialState, action: any): InitialProfileState => {

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
        case TOGGLE_FETCHING: {
            return {...state, isFetching: action.isFetching};
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
        default:
            return state;
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

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}

export const setStatusAC = (status: string): SetStatusActionType => {
    return {type: SET_STATUS, status}
};

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => {
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

type SetPhotoActionType = {
    type: typeof SET_PHOTO
    photos: PhotosType
}

export const setPhoto = (photos: PhotosType): SetPhotoActionType => {
    return {type: SET_PHOTO, photos}
};


export const getUserProfile = (userId: number) => async (dispatch: any) => {
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

export const getMyProfile = () => async (dispatch: any) => {
    try {
        const data: AuthMeResponseType = await AuthAPI.AuthMe();
        if (data.resultCode === 0) {
            dispatch(getUserProfile(data.data.id));
        }
    } catch (e) {
        console.error(e)
    }
};

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    try {
        const data:string = await ProfileAPI.getStatus(userId);
        dispatch(setStatusAC(data));
    } catch (e) {
        console.error(e)
    }
};

type SavePhotoResponseType = {
    resultCode: number
    messages: Array<string>
    data: { photos: PhotosType}
}

export const savePhoto = (file: any) => async (dispatch: any) => {
  try {
     const data: SavePhotoResponseType = await ProfileAPI.savePhoto(file);
     dispatch(setPhoto(data.data.photos));
  }  catch (e){
      console.error(e)
  }
};

type SaveProfileResponseType = {
    resultCode: number
    messages: Array<string>
    data: object
}

export const saveProfile = (data: ProfileType) => async (dispatch: any) => {
    try{
        const res: SaveProfileResponseType = await ProfileAPI.saveProfile(data);
        if (res.resultCode === 0)
            return dispatch(getMyProfile());
        const message = res.messages.length > 0 ? res.messages[0] : 'some error';
        dispatch(stopSubmit('description', { _error: message }));
    } catch (e) {
        console.error(e)
    }
};


export default profileReducer;