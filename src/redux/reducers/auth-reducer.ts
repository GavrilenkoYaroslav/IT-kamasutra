import {AuthAPI, LoginRequestType, ProfileAPI, resultCodes, SequrityAPI} from '../../API/API';
import {FormAction, stopSubmit} from 'redux-form';
import {SetPhotoActionType, SET_PHOTO} from "./profile-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";


export const SET_USER_AUTH_DATA = 'auth_reducer/SET_USER_AUTH_DATA';
const TOGGLE_FETCHING_AUTH = 'auth_reducer/TOGGLE_FETCHING_AUTH';
const SET_LOGO_SRC = 'auth_reducer/SET_LOGO_SRC';
const SET_CAPTCHA = 'auth_reducer/SET_CAPTCHA';


export type InitialAuthStateType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isFetching: boolean,
    logoSrc: string | null,
    captchaUrl: string
};

const initialState: InitialAuthStateType = {
    id: null,
    login: null,
    email: null,
    isFetching: false,
    logoSrc: null,
    captchaUrl: ''
};

const authReducer = (state = initialState, action: ActionsTypes): InitialAuthStateType => {

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

type ActionsTypes = SetLogoSrcType | ToggleFetchingType |
                    SetCaptchaUrlType | SetUserAuthDataType | SetPhotoActionType;

type SetLogoSrcType = {
    type: typeof SET_LOGO_SRC,
    logoSrc: string | null
}

export const setLogoSrc = (logoSrc: string | null): SetLogoSrcType => {
    return {type: SET_LOGO_SRC, logoSrc};
};

type ToggleFetchingType = {
    type: typeof TOGGLE_FETCHING_AUTH,
    isFetching: boolean
}

export const toggleFetching = (isFetching: boolean): ToggleFetchingType => {
    return {
        type: TOGGLE_FETCHING_AUTH,
        isFetching,
    };
};

type SetCaptchaUrlType = {
    type: typeof SET_CAPTCHA,
    url: string
}

export const setCaptchaUrl = (url: string): SetCaptchaUrlType => {
    return {type: SET_CAPTCHA, url}
};

type AuthDataType = {
    id: number | null
    login: string | null
    email: string | null
}
export type SetUserAuthDataType = {
    type: typeof SET_USER_AUTH_DATA,
    data: AuthDataType
}

export const setUserAuthData = (id: number | null, login: string | null, email: string | null): SetUserAuthDataType => {
    return {type: SET_USER_AUTH_DATA, data: {id, login, email}};
};

type ProfileContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    photos: PhotosType
    aboutMe: string
    contacts: ProfileContactsType
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes | FormAction>;

export const authMe = (): ThunkType => async dispatch => {
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


export const login = (data: LoginRequestType): ThunkType => async dispatch => {
    const res = await AuthAPI.AuthLogin(data);
    if (res.resultCode === resultCodes.Success) {
        dispatch(setCaptchaUrl(''));
        return dispatch(authMe());
    } else {
        if (res.resultCode === resultCodes.CaptchaIsRequired) {
            await dispatch(getCaptcha());
        }
        const message = res.messages.length > 0 ? res.messages[0] : 'some error';
        dispatch(stopSubmit('login', {_error: message}));
    }
};

export const logout = (): ThunkType => async dispatch => {
    await AuthAPI.AuthLogout();
    dispatch(setUserAuthData(null, null, null));
};


export const getCaptcha = (): ThunkType => async dispatch => {
    try {
        const captcha = await SequrityAPI.getCaptcha();
        dispatch(setCaptchaUrl(captcha.url))
    } catch (e) {
        console.error(e)
    }
};

export default authReducer;