import React from 'react';
import styles from './friend.module.css'
import userLogo from '../../../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg'
import {NavLink} from "react-router-dom";


type PropsType = {
    logoSrc: string | null
    name: string
    id: number
}

const Friend: React.FC<PropsType> = (props) => {
    return(
        <div className={styles.friend}>
            <NavLink to={`/profile/${props.id}`}>
            <img src={props.logoSrc || userLogo} alt={''}/>
            </NavLink>
            <div className={styles.friendName}>{props.name}</div>
        </div>
    );
};

export default Friend;