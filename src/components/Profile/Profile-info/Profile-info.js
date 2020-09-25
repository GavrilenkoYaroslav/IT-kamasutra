import React from 'react';
import styles from './Profile-Info.module.css';
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = (props) => {

    if (!props.profile){
        return <Preloader/>
    }
    let contactInfo = [];

    for( let key in props.profile.contacts){
        contactInfo.push(`${key} : ${props.profile.contacts[key]}  `)
    }

    return(
        <div className={styles.user}>
            <div className={styles.Avatar}>
                <img src={props.profile.photos.large}/>
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
        </div>
    );
};

export default ProfileInfo;