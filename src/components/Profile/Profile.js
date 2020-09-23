import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from "./Profile-info/Profile-info";
import Wallpaper from "../Wallpaper/Wallpaper";
import PostsContainer from "./Posts/PostsContainer";

const Profile = (props) => {
    return (
        <div className={styles.Profile}>
            <Wallpaper/>
            <ProfileInfo profile={props.profile}/>
            <PostsContainer/>

        </div>
    );
};

export default Profile;