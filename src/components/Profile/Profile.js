import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from "./Profile-info/Profile-info";
import Wallpaper from "../Wallpaper/Wallpaper";
import PostsContainer from "./Posts/PostsContainer";

const Profile = () => {
    return (
        <div className={styles.Profile}>
            <Wallpaper/>
            <ProfileInfo/>
            <PostsContainer/>

        </div>
    );
};

export default Profile;