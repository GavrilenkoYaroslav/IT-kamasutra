import React from 'react';
import styles from './DialogItem.module.css';
import {NavLink} from "react-router-dom";
import userLogo from '../../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg'

type PropsType = {
    logoSrc: string|null
    id: number
    name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    return(
        <div className={styles.dialog}>
            <img src={props.logoSrc || userLogo}/>
            <NavLink to={`/dialogs/${props.id}`} activeClassName={styles.active}> {props.name} </NavLink>
        </div>
    );
};

export default DialogItem;