import {authMe, SET_USER_AUTH_DATA, SetUserAuthDataType} from './auth-reducer';
import {AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";

const SWITCH_THEME = 'app_reducer/SWITCH_THEME';

type InitialSatateType = {
    initialized: boolean
    theme: null | 'Dark'
}

const initialState: InitialSatateType = {
  initialized : false,
  theme: null
};


const appReducer = (state = initialState, action: actionsType):InitialSatateType => {

    switch (action.type) {
        case SET_USER_AUTH_DATA:
            return {...state, initialized: true};
        case SWITCH_THEME:
            return {...state, theme: action.theme};
        default:
            return state;
    }
};

type actionsType = SwitchThemeType | SetUserAuthDataType;

type SwitchThemeType = {
    type: typeof SWITCH_THEME,
    theme: null | 'Dark'
}

export const switchTheme = (theme: null | 'Dark'):SwitchThemeType => {
    return {
        type: SWITCH_THEME,
        theme
    }
};

export const initializeApp = (): ThunkAction< void, AppStateType, unknown, AnyAction> => dispatch => {
    dispatch(authMe());
};


export default appReducer;