import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    clearProfile,
    getMyProfile,
    getUserProfile,
    getUserStatus,
    savePhoto, saveProfile
} from "../../redux/reducers/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";


const ProfileContainer = (props) => {

    useEffect(() => {
        if (!props.match.params.userId) {
            !props.id && props.clearProfile();
            props.getMyProfile();
        } else {
            let userId = props.match.params.userId;
            props.getUserProfile(userId);
        }
    }, [props.match.params.userId]);


    return (
        <Profile profile={props.profile} status={props.status}
                 isFetching={props.isFetching} isMyProfile={!props.match.params.userId}
                 savePhoto={props.savePhoto}
                 saveProfile={props.saveProfile}/>
    );

};


let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isFetching: state.profilePage.isFetching,
        id: state.auth.id
    }
};

let mapDispatchToProps = {
    getUserProfile,
    getMyProfile,
    getUserStatus,
    clearProfile,
    savePhoto,
    saveProfile
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(ProfileContainer);