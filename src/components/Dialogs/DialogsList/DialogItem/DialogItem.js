import React from 'react';
import styles from './DialogItem.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return(
        <div className={styles.dialog}>
            <img src={props.logoSrc}/>
            <NavLink to={`/dialogs/${props.Id}`} activeClassName={styles.active}> {props.name} </NavLink>
        </div>
    );
};

export default DialogItem;