import React from 'react';
import styles from './User.module.css';
import userLogo from '../../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg'
import {NavLink} from "react-router-dom";
import {Button} from "antd";


type PropsType = {
    id: number
    logoSrc: string | null
    followingInProgress: Array<number>
    followed: boolean
    name: string
    follow: (userId:number) => void
    unfollow: (userId:number) => void
    currentAuthUserId: null|number
}

const User: React.FC<PropsType> = (props) => {
    return (
        <div className={styles.userContainer}>
            <div className={styles.logo}>
                <NavLink to={`/profile/${props.id}`}>
                    <img src={props.logoSrc || userLogo} alt={''}/>
                </NavLink>
            </div>
            <div className={styles.userName}>
                {props.name}
            </div>
            {props.currentAuthUserId &&
            <div className={styles.followButtonContainer}>
                <Button disabled={props.followingInProgress.some(id => id === props.id)}
                        onClick={() => {
                            props[props.followed ? 'unfollow' : 'follow'](props.id)
                        }}>{props.followed ? 'Unfollow' : 'Follow'}</Button>
            </div>}
        </div>
    );
};

export default User;