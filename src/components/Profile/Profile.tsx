import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from "./Profile-info/Profile-info";
import Wallpaper from "../Wallpaper/Wallpaper";
import PostsContainer from "./Posts/PostsContainer";
import Preloader from "../common/Preloader/Preloader";
import {ProfileType} from "../../redux/reducers/auth-reducer";
import {DescriptionFormDataType} from "./Profile-info/DescriptionForm";

type PropsType = {
    profile: ProfileType | null
    status: string
    isMyProfile: boolean
    savePhoto: (file: any) => void
    saveProfile: (profile: DescriptionFormDataType) => void
    isFetching: boolean
}

const Profile: React.FC<PropsType> = (props) => {
    return (
        <div className={styles.Profile}>
            <Wallpaper/>
            {props.isFetching ? <Preloader/> :
                <ProfileInfo profile={props.profile}
                             status={props.status}
                             isMyProfile={props.isMyProfile}
                             savePhoto={props.savePhoto}
                             saveProfile={props.saveProfile}/>}
            <PostsContainer/>
        </div>
    );
};

export default Profile;