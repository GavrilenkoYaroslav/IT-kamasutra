import {authMe, SET_USER_AUTH_DATA, SetUserAuthDataType} from './auth-reducer';
import {AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";


type InitialSatateType = {
    initialized: boolean
}

const initialState = {
  initialized : false
};


const appReducer = (state = initialState, action: SetUserAuthDataType):InitialSatateType => {

    switch (action.type) {
        case SET_USER_AUTH_DATA:
            return {...state, initialized: true};
        default:
            return state;
    }
};


export const initializeApp = (): ThunkAction< void, AppStateType, unknown, AnyAction> => dispatch => {
    dispatch(authMe());
};


export default appReducer;