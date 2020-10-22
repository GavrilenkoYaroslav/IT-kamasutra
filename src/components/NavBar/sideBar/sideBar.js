import React from 'react';
import styles from './sideBar.module.css';
import Friend from './friend/friend';

const SideBar = (props) => {

    return(
        <div className={styles.sideBar}>
            <div className={styles.title}>Friends:</div>
            <div className={styles.friendsList}>
            {props.someUsers.map(friend => <Friend key={friend.id} name={friend.name} logoSrc={friend.logoSrc}/>)}
            </div>
        </div>
    );
};

export default SideBar;