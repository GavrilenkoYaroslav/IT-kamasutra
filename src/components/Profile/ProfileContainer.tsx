import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect, useSelector} from "react-redux";
import {
    clearProfile,
    getMyProfile,
    getUserProfile,
    getUserStatus,
    savePhoto, saveProfile
} from "../../redux/reducers/profile-reducer";
import {NavLink, RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {ProfileType} from "../../redux/reducers/auth-reducer";
import {DescriptionFormDataType} from "./Profile-info/DescriptionForm";
import {AppStateType} from "../../redux/redux-store";
import Preloader from "../common/Preloader/Preloader";
import Lottie from 'react-lottie';
import userAvatar from '../../lotties/userAvatar.json'
import {Col, Row} from "antd";
import styles from './Profile.module.css'

type MapstatePropsType = {
    profile: ProfileType | null
    status: string
    isProfileFetching: boolean
    isFetching: boolean
    id: number | null
}
type MapDispatchPropsType = {
    getUserProfile: (id: number) => void
    getMyProfile: () => void
    getUserStatus: (id: number) => void
    clearProfile: () => void
    savePhoto: (file: any) => void
    saveProfile: (profile: DescriptionFormDataType) => void
}
type UrlParamsType = {
    userId: string | undefined
}
type PropsType = MapstatePropsType & MapDispatchPropsType & RouteComponentProps<UrlParamsType>;


const ProfileContainer: React.FC<PropsType> = (props) => {

    const theme = useSelector((state: AppStateType) => state.app.theme);

    const lottieOptions = {
        autoplay: true,
        animationData: userAvatar
    };

    useEffect(() => {
        if (!props.match.params.userId) {
            !props.id && props.clearProfile();
            props.getMyProfile();
        } else {
            let userId = props.match.params.userId;
            props.getUserProfile(Number(userId));
        }
    }, [props.match.params.userId]);

    if (!props.id && !props.match.params.userId) {
        return (
            <>
                {props.isProfileFetching || props.isFetching ? <Preloader/> :
                    <Row justify='center' align={'middle'} style={{height: '100%'}}>
                        <Col span={16}>
                            <div className={`${styles.container} ${theme ? 'dark' : ''}`}>
                                <h1>Please <NavLink to='/login'><b>Log In</b></NavLink></h1>
                                    <Lottie options={lottieOptions} width={300} height={300}/>
                            </div>
                        </Col>
                    </Row>
                }
            </>
        );
    }

    return (
        <>
            {props.profile && !props.isProfileFetching ? <Profile profile={props.profile} status={props.status}
                     isFetching={props.isProfileFetching} isMyProfile={!props.match.params.userId}
                     savePhoto={props.savePhoto} theme={theme}
                     saveProfile={props.saveProfile}/> : <Preloader/>}
        </>
    );

};


let mapStateToProps = (state: AppStateType): MapstatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isProfileFetching: state.profilePage.isProfileFetching,
        isFetching: state.auth.isFetching,
        id: state.auth.id
    }
};

let mapDispatchToProps: MapDispatchPropsType = {
    getUserProfile,
    getMyProfile,
    getUserStatus,
    clearProfile,
    savePhoto,
    saveProfile
};

export default compose<React.ComponentType>(
    connect<MapstatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps),
    withRouter
)(ProfileContainer);