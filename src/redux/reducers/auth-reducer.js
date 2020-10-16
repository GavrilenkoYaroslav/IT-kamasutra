import {AuthAPI, ProfileAPI} from "../../API/API";
import {stopSubmit} from 'redux-form';

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
            return {...state, ...action.data};
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


export const setUserAuthData = (id, login, email, auth) => {
  return { type: SET_USER_AUTH_DATA, data: {id, login, email, auth} }
};

export const authMe = () => async dispatch => {
    dispatch(toggleFetching(true));
    const data = await AuthAPI.AuthMe();
    if (data.resultCode === 0) {
    const {id, login, email} = data.data;
    await dispatch(setUserAuthData(id, login, email, true));

    const profile = await ProfileAPI.getProfile(id);
    dispatch(setLogoSrc(profile.photos.small));}
    dispatch(toggleFetching(false));
};

export const login = (data) => async dispatch => {
    const res = await AuthAPI.AuthLogin(data);
    debugger;
    if (res.data.resultCode === 0) {
        await dispatch(authMe());
    } else {
        const message = res.data.messages.length > 0? res.data.messages[0]: 'some error';
      await dispatch(stopSubmit('login', { _error : message }));
    }
};

export const logout = () => async dispatch => {
    await AuthAPI.AuthLogout();
    dispatch(setUserAuthData(null, null, null, false));
};




export default authReducer;