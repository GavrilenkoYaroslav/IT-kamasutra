import React from 'react';
import styles from './sideBar.module.css';
import Friend from './friend/friend';

const SideBar = (props) => {
    let friendsElements = props.DialogsData.map( friend => <Friend name={friend.name} logoSrc={friend.logoSrc}/> );

    return(
        <div className={styles.sideBar}>
            <div className={styles.title}>Friends:</div>
            <div className={styles.friendsList}>
            {friendsElements}
            </div>
        </div>
    );
};

export default SideBar;