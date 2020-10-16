import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./reducers/profile-reducer";
import dialogsReducer from "./reducers/dialogs-reducer";
import usersReducer from "./reducers/users-reducer";
import authReducer from "./reducers/auth-reducer";
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form';

let reducers = combineReducers({
   profilePage : profileReducer,
    dialogsPage : dialogsReducer,
    usersPage : usersReducer,
    auth : authReducer,
    form : formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
