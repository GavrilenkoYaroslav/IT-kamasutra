import React from 'react';
import styles from './sideBar.module.css';
import Friend from './friend/friend';
import {UserType} from "../../../redux/reducers/users-reducer";

type PropsType = {
    userFriends: Array<UserType>
}

const SideBar: React.FC<PropsType> = (props) => {

    return(<>
        {!!props.userFriends.length &&
        <div className={styles.sideBar}>
            <div className={styles.title}>Friends:</div>
            <div className={styles.friendsList}>
            {props.userFriends.map(friend => <Friend key={friend.id} id={friend.id} name={friend.name} logoSrc={friend.photos.small}/>)}
            </div>
        </div>}
        </>
    );
};

export default SideBar;