import React from 'react';
import Header from "./Head";
import {connect} from "react-redux";
import {InitialAuthStateType, logout, ProfileType} from "../../redux/reducers/auth-reducer";
import {setUserProfile} from "../../redux/reducers/profile-reducer";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    auth: InitialAuthStateType
}

type MapDispatchPropsType = {
    logout: () => void
    setUserProfile: (profile: ProfileType|null) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const HeaderContainer: React.FC<PropsType> = (props) => {
        return (
            <Header {...props}/>
        );
    };

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        auth: state.auth
    }
};

let mapDispatchToProps: MapDispatchPropsType = {
    logout,
    setUserProfile
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(HeaderContainer);