import {AuthAPI, ProfileAPI} from "../../API/API";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';


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
        case SET_STATUS: {
            return {...state, status: action.status}
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


export const getUserProfile = (userId) => async dispatch => {
    dispatch(toggleFetching(true));
    await ProfileAPI.getProfile(userId)
        .then(async data => {
            dispatch(setUserProfile(data));
            await dispatch(getUserStatus(userId));
        }).finally(() => dispatch(toggleFetching(false)) );
};

export const getMyProfile = () => dispatch => {
    AuthAPI.AuthMe()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(getUserProfile(data.data.id));
            }
        });

};

export const getUserStatus = (userId) =>async dispatch => {
    await ProfileAPI.getStatus(userId)
        .then(data => {
            dispatch(setStatusAC(data.data));
        });
};


export default profileReducer;