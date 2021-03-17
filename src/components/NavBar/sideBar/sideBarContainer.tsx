import React from 'react';
import {connect, useSelector} from "react-redux";
import SideBar from "./sideBar";
import {AppStateType} from "../../../redux/redux-store";
import {UserType} from "../../../redux/reducers/users-reducer";


type PropsType = MapStatePropsType;
type MapStatePropsType = {
    userFriends: Array<UserType>
}

const SideBarContainer: React.FC<PropsType> = (props) => {

    const theme = useSelector((state: AppStateType) => state.app.theme);

    return (
        <SideBar theme={theme} userFriends={props.userFriends}/>
    );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
   return {
       userFriends : state.profilePage.userFriends
   }
};

export default connect<MapStatePropsType,{},{},AppStateType>(mapStateToProps)(SideBarContainer);

