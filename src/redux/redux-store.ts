import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./reducers/profile-reducer";
import dialogsReducer from "./reducers/dialogs-reducer";
import usersReducer from "./reducers/users-reducer";
import authReducer from "./reducers/auth-reducer";
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form';
import appReducer from "./reducers/app-reducer";

const rootReducer = combineReducers({
   profilePage : profileReducer,
    dialogsPage : dialogsReducer,
    usersPage : usersReducer,
    auth : authReducer,
    app : appReducer,
    form : formReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


