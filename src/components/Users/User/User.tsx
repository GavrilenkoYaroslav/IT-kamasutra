import React from 'react';
import styles from './User.module.css';
import userLogo from '../../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg'
import {NavLink} from "react-router-dom";
import {Button} from "antd";
import {UserType} from "../../../redux/reducers/users-reducer";


type PropsType = {
    followingInProgress: Array<number>
    follow: (user: UserType) => void
    unfollow: (user: UserType) => void
    currentAuthUserId: null|number
    user: UserType
}

const User: React.FC<PropsType> = (props) => {
    return (
        <div className={styles.userContainer}>
            <div className={styles.logo}>
                <NavLink to={`/profile/${props.user.id}`}>
                    <img src={props.user.photos.small || userLogo} alt={''}/>
                </NavLink>
            </div>
            <div className={styles.userName}>
                {props.user.name}
            </div>
            {props.currentAuthUserId &&
            <div className={styles.followButtonContainer}>
                <Button disabled={props.followingInProgress.some(id => id === props.user.id)}
                        onClick={() => {
                            props[props.user.followed ? 'unfollow' : 'follow'](props.user)
                        }}>{props.user.followed ? 'Unfollow' : 'Follow'}</Button>
            </div>}
        </div>
    );
};

export default User;