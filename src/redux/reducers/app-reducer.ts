import {authMe, SET_USER_AUTH_DATA, SetUserAuthDataType} from './auth-reducer';

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


export const initializeApp = () =>  (dispatch:any) => {
    dispatch(authMe());
};


export default appReducer;