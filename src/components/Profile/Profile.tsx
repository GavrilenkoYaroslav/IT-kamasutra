import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from "./Profile-info/Profile-info";
import PostsContainer from "./Posts/PostsContainer";
import {ProfileType} from "../../redux/reducers/auth-reducer";
import {DescriptionFormDataType} from "./Profile-info/DescriptionForm";
import Preloader from "../common/Preloader/Preloader";

type PropsType = {
    profile: ProfileType
    status: string
    isMyProfile: boolean
    savePhoto: (file: any) => void
    saveProfile: (profile: DescriptionFormDataType) => void
    isFetching: boolean
    theme: 'Dark' | null
}

const Profile: React.FC<PropsType> = (props) => {
    return (
        <div className={`${styles.Profile} ${props.theme ? 'dark' : ''}`}>
            {props.isFetching ? <Preloader/> :
                <>
                <ProfileInfo profile={props.profile}
                             status={props.status}
                             isMyProfile={props.isMyProfile}
                             theme={props.theme}
                             savePhoto={props.savePhoto}
                             saveProfile={props.saveProfile}/>
            <PostsContainer theme={props.theme} isMyProfile={props.isMyProfile} profileFullName={props.profile.fullName}/>
          </>}
        </div>
    );
};

export default Profile;