import React from 'react';
import styles from './friend.module.css'
import userLogo from '../../../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg'


type PropsType = {
    logoSrc: string | null
    name: string
}

const Friend: React.FC<PropsType> = (props) => {
    return(
        <div className={styles.friend}>
            <img src={props.logoSrc || userLogo} alt={''}/>
            <div className={styles.friendName}>{props.name}</div>
        </div>
    );
};

export default Friend;