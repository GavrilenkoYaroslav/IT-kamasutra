import { AuthAPI, ProfileAPI } from '../../API/API';
import { stopSubmit } from 'redux-form';

export const SET_USER_AUTH_DATA = 'SET_USER_AUTH_DATA';
const TOGGLE_FETCHING_AUTH = 'TOGGLE_FETCHING_AUTH';
const SET_LOGO_SRC = 'SET_LOGO_SRC';

// social-network.samuraijs.com
// Email: free@samuraijs.com
// Password: free


let initialState = {
	id: null,
	login: null,
	email: null,
	isFetching: false,
	logoSrc: null,
};

const authReducer = (state = initialState, action) => {

	switch ( action.type ) {
		case SET_USER_AUTH_DATA:
			return { ...state, ...action.data };
		case TOGGLE_FETCHING_AUTH:
			return { ...state, isFetching: action.isFetching };
		case SET_LOGO_SRC:
			return { ...state, logoSrc: action.logoSrc };
		default:
			return state;
	}

};

export const setLogoSrc = (logoSrc) => {
	return { type: SET_LOGO_SRC, logoSrc };
};

export const toggleFetching = (isFetching) => {
	return {
		type: TOGGLE_FETCHING_AUTH,
		isFetching,
	};
};


export const setUserAuthData = (id, login, email, auth) => {
	return { type: SET_USER_AUTH_DATA, data: { id, login, email, auth } };
};

export const authMe = () => async dispatch => {
	try {
		dispatch(toggleFetching(true));
		const data = await AuthAPI.AuthMe();

		const { id, login, email } = data.data;
		dispatch(setUserAuthData(id, login, email));

		const profile = id && await ProfileAPI.getProfile(id);
		dispatch(setLogoSrc(profile.photos.small));
	} catch ( e ) {
		console.error(e);
	} finally {
		dispatch(toggleFetching(false));
	}
};

export const login = (data) => async dispatch => {
	const res = await AuthAPI.AuthLogin(data);

	if ( res.data.resultCode === 0 ) {
		return dispatch(authMe());
	}

	// _.isEmpty(res.data.messages)
	// _.size(res.data.messages)
	const message = res.data.messages.length > 0 ? res.data.messages[0] : 'some error';
	dispatch(stopSubmit('login', { _error: message }));

};

export const logout = () => async dispatch => {
	await AuthAPI.AuthLogout();
	dispatch(setUserAuthData());
};


export default authReducer;