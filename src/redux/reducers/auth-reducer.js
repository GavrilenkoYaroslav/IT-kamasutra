import {AuthAPI, ProfileAPI, UsersAPI} from "../../API/API";

const SET_USER_AUTH_DATA = 'SET_USER_AUTH_DATA';
const TOGGLE_FETCHING_AUTH = 'TOGGLE_FETCHING_AUTH';
const SET_LOGO_SRC = 'SET_LOGO_SRC';

// social-network.samuraijs.com
// Email: free@samuraijs.com
// Password: free


let initialState = {
    id: null,
    login: null,
    email: null,
    auth: false,
    isFetching: false,
    logoSrc: null
};


const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_AUTH_DATA:
            return {...state, ...action.data, auth: true};
        case TOGGLE_FETCHING_AUTH:
            return {...state, isFetching: action.isFetching};
        case SET_LOGO_SRC:
            return {...state, logoSrc : action.logoSrc};
        default:
            return state;
    }

};

export const setLogoSrc = (logoSrc) => {
  return { type : SET_LOGO_SRC, logoSrc }
};

export const toggleFetching = (isFetching) => {
    return {
        type: TOGGLE_FETCHING_AUTH,
        isFetching
    }
};


export const setUserAuthData = (id, login, email) => {
  return { type: SET_USER_AUTH_DATA, data: {id, login, email} }
};

export const authMe = () => dispatch => {
    dispatch(toggleFetching(true));
    AuthAPI.AuthMe()
        .then(data => {
            dispatch(toggleFetching(false));
            if (data.resultCode === 0) {
                let {id, login, email} = data.data;
                dispatch(setUserAuthData(id, login, email));

                ProfileAPI.getProfile(id)
                    .then(data => {
                        dispatch(setLogoSrc(data.photos.small));
                    });
            }
        });
};


export default authReducer;