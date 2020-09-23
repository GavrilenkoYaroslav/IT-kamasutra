import React from 'react';
import styles from './User.module.css';
import userLogo from '../../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg'
import {NavLink} from "react-router-dom";

const User = (props) => {
    return (
        <div>
            <div className={styles.logo}>
                <NavLink to={`/profile/${props.id}`}>
                <img src ={props.logoSrc != null? props.logoSrc : userLogo}/>
                </NavLink>
            </div>
            <div>
                {props.followed ? <button onClick={()=> {props.unfollow(props.id)} }>Unfollow</button> : <button onClick={()=> {props.follow(props.id)}}>Follow</button>}
            </div>
            <div>
                {props.name}
            </div>
            <div>
               city
                country
            </div>
        </div>
    );
};

export default User;