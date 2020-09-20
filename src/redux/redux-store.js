import {combineReducers, createStore} from "redux";
import profileReducer from "./reducers/profile-reducer";
import dialogsReducer from "./reducers/dialogs-reducer";
import usersReducer from "./reducers/users-reducer";

let reducers = combineReducers({
   profilePage : profileReducer,
    dialogsPage : dialogsReducer,
    usersPage : usersReducer
});

let store = createStore(reducers);

export default store;