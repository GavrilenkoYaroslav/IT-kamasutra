import {AuthAPI, ProfileAPI} from "../../API/API";
import {stopSubmit} from "redux-form";

export const SET_PHOTO = 'profile_reducer/SET_PHOTO';
const CLEAR_PROFILE = 'profile_reducer/CLEAR_PROFILE';
const ADD_POST = 'profile_reducer/ADD_POST';
const SET_USER_PROFILE = 'profile_reducer/SET_USER_PROFILE';
const SET_STATUS = 'profile_reducer/SET_STATUS';
const TOGGLE_FETCHING = 'profile_reducer/TOGGLE_FETCHING';


const initialState = {
    postData: [
        {id: 1, post: 'Hi, how are you?', likesCount: '9'},
        {id: 2, post: 'Working hard.', likesCount: '15'}
    ],
    profile: null,
    status: '',
    isFetching: false,
};

const profileReducer = (state = initialState, action) => {

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
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        default:
            return state;
    }

};

export const toggleFetching = (isFetching) => {
    return {
        type: TOGGLE_FETCHING,
        isFetching
    }
};

export const setStatusAC = (status) => {
    return {type: SET_STATUS, status}
};

export const setUserProfile = (profile) => {
    return {type: SET_USER_PROFILE, profile}
};

export const addPostActionCreator = (post) => {
    return {type: ADD_POST, post};
};

export const clearProfile = () => {
    return {type: CLEAR_PROFILE};
};

export const setPhoto = (photos) => {
    return {type: SET_PHOTO, photos}
};

export const getUserProfile = (userId) => async dispatch => {
    dispatch(toggleFetching(true));
    try {
        const data = await ProfileAPI.getProfile(userId);
        dispatch(setUserProfile(data));
        dispatch(getUserStatus(userId));
    } catch (e) {
        console.error(e)
    } finally {
        dispatch(toggleFetching(false))
    }
};

export const getMyProfile = () => async dispatch => {
    try {
        const data = await AuthAPI.AuthMe();
        if (data.resultCode === 0) {
            dispatch(getUserProfile(data.data.id));
        }
    } catch (e) {
        console.error(e)
    }
};

export const getUserStatus = (userId) => async dispatch => {
    try {
        const data = await ProfileAPI.getStatus(userId);
        dispatch(setStatusAC(data.data));
    } catch (e) {
        console.error(e)
    }
};

export const savePhoto = (file) => async dispatch => {
  try {
     const data = await ProfileAPI.savePhoto(file);
     dispatch(setPhoto(data.data.data.photos));
  }  catch (e){
      console.error(e)
  }
};

export const saveProfile = (data) => async dispatch => {
    try{
        const res = await ProfileAPI.saveProfile(data);
        if (res.data.resultCode === 0)
            return dispatch(getMyProfile());
        const message = res.data.messages.length > 0 ? res.data.messages[0] : 'some error';
        dispatch(stopSubmit('description', { _error: message }));
    } catch (e) {
        console.error(e)
    }
};


export default profileReducer;