import React from 'react';
import styles from './friend.module.css'

const Friend = (props) => {
    return(
        <div className={styles.friend}>
            <img src={props.logoSrc}/>
            <div className={styles.friendName}>{props.name}</div>
        </div>
    );
};

export default Friend;