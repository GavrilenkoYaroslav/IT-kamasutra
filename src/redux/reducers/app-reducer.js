import { authMe, SET_USER_AUTH_DATA } from './auth-reducer';


let initialState = {
  initialized : false
};


const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_AUTH_DATA:
            return {...state, initialized: true};
        default:
            return state;
    }
};


export const initializeApp = () =>  dispatch => {
    dispatch(authMe());
};


export default appReducer;