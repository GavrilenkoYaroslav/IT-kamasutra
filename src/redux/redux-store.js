import {combineReducers, createStore} from "redux";
import profileReducer from "./reducers/profile-reducer";
import dialogsReducer from "./reducers/dialogs-reducer";
import usersReducer from "./reducers/users-reducer";
import authReducer from "./reducers/auth-reducer";

let reducers = combineReducers({
   profilePage : profileReducer,
    dialogsPage : dialogsReducer,
    usersPage : usersReducer,
    auth: authReducer
});

let store = createStore(reducers);

export default store;