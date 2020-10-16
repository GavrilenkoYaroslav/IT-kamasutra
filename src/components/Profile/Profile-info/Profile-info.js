import React, {useState} from 'react';
import styles from './Profile-Info.module.css';
// import Preloader from "../../common/Preloader/Preloader";
import Status from "./Status";
import userLogo from '../../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg'

const ProfileInfo = (props) => {

    if (!props.profile){
        return <div>Please Log in</div>
    }

    let contactInfo = [];

    for( let key in props.profile.contacts){
        contactInfo.push(`${key} : ${props.profile.contacts[key]}  `)
    }


    return(
        <div className={styles.user}>
            <div className={styles.Avatar}>
                <img src={props.profile.photos.large || userLogo}/>
            </div>
            <div className={styles.description}>
                <div>
                    <div>
                    <b>{props.profile.fullName}</b>
                    </div>
                About me: {props.profile.aboutMe}
                </div>
                {contactInfo}
            </div>

            <Status status={props.status}/>

        </div>
    );
};

export default ProfileInfo;