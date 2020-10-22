import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from "./Profile-info/Profile-info";
import Wallpaper from "../Wallpaper/Wallpaper";
import PostsContainer from "./Posts/PostsContainer";
import Preloader from "../common/Preloader/Preloader";

const Profile = (props) => {
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