import React from 'react';
import styles from './User.module.css';
import userLogo from '../../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg'
import {NavLink} from "react-router-dom";

type PropsType = {
    id: number
    logoSrc: string | null
    followingInProgress: Array<number>
    followed: boolean
    name: string
    follow: (userId:number) => void
    unfollow: (userId:number) => void
}

const User: React.FC<PropsType> = (props) => {
    return (
        <div>
            <div className={styles.logo}>
                <NavLink to={`/profile/${props.id}`}>
                    <img src={props.logoSrc || userLogo} alt={''}/>
                </NavLink>
            </div>
            <div>
                <button disabled={props.followingInProgress.some(id => id === props.id)}
                        onClick={() => {
                            props[props.followed ? 'unfollow' : 'follow'](props.id)
                        }}>{props.followed ? 'Unfollow' : 'Follow'}</button>
            </div>
            <div>
                {props.name}
            </div>
        </div>
    );
};

export default User;