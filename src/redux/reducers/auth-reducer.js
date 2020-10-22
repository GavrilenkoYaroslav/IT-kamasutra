import {AuthAPI, ProfileAPI, SequrityAPI} from '../../API/API';
import {stopSubmit} from 'redux-form';
import {SET_PHOTO} from "./profile-reducer";

export const SET_USER_AUTH_DATA = 'auth_reducer/SET_USER_AUTH_DATA';
const TOGGLE_FETCHING_AUTH = 'auth_reducer/TOGGLE_FETCHING_AUTH';
const SET_LOGO_SRC = 'auth_reducer/SET_LOGO_SRC';
const SET_CAPTCHA = 'auth_reducer/SET_CAPTCHA';

// social-network.samuraijs.com
// Email: free@samuraijs.com
// Password: free


let initialState = {
    id: null,
    login: null,
    email: null,
    isFetching: false,
    logoSrc: null,
    captchaUrl:null
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_AUTH_DATA:
            return {...state, ...action.data};
        case TOGGLE_FETCHING_AUTH:
            return {...state, isFetching: action.isFetching};
        case SET_LOGO_SRC:
            return {...state, logoSrc: action.logoSrc};
        case SET_PHOTO:
            return {...state, logoSrc: action.photos.small};
        case SET_CAPTCHA:
            return {...state, captchaUrl: action.url};
        default:
            return state;
    }

};

export const setLogoSrc = (logoSrc) => {
    return {type: SET_LOGO_SRC, logoSrc};
};

export const toggleFetching = (isFetching) => {
    return {
        type: TOGGLE_FETCHING_AUTH,
        isFetching,
    };
};

export const setCaptchaUrl = (url) => {
   return {type: SET_CAPTCHA, url}
};

export const setUserAuthData = (id, login, email) => {
    return {type: SET_USER_AUTH_DATA, data: {id, login, email}};
};

export const authMe = () => async dispatch => {
    try {
        dispatch(toggleFetching(true));
        const data = await AuthAPI.AuthMe();

        const {id, login, email} = data.data;
        dispatch(setUserAuthData(id, login, email));

        const profile = id && await ProfileAPI.getProfile(id);
        profile && dispatch(setLogoSrc(profile.photos.small));
    } catch (e) {
        console.error(e);
    } finally {
        dispatch(toggleFetching(false));
    }
};

export const login = (data) => async dispatch => {
    const res = await AuthAPI.AuthLogin(data);
    if (res.data.resultCode === 0) {
        dispatch(setCaptchaUrl(null));
        return dispatch(authMe());
    }else {
        if (res.data.resultCode === 10) {
            await dispatch(getCaptcha());
        }
        // _.isEmpty(res.data.messages)
        // _.size(res.data.messages)
        const message = res.data.messages.length > 0 ? res.data.messages[0] : 'some error';
        dispatch(stopSubmit('login', {_error: message}));
    }
};

export const logout = () => async dispatch => {
    await AuthAPI.AuthLogout();
    dispatch(setUserAuthData());
};

export const getCaptcha = () => async dispatch => {
    try {
        const captcha = await SequrityAPI.getCaptcha();
        dispatch(setCaptchaUrl(captcha.data.url))
    }catch (e) {
        console.error(e)
    }
};

export default authReducer;