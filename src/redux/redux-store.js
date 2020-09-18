import {combineReducers, createStore} from "redux";
import profileReducer from "./reducers/profile-reducer";
import dialogsReducer from "./reducers/dialogs-reducer";

let reducers = combineReducers({
   profilePage : profileReducer,
    dialogsPage : dialogsReducer
});

let store = createStore(reducers);

export default store;