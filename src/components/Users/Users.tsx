import React from 'react';
import {UserType} from '../../redux/reducers/users-reducer';
import User from "./User/User";
import styles from './users.module.css';
import usersSearchBack from '../../Images/usersSearchBack.svg'


type PropsType = {
    users: Array<UserType>
    follow: (user: UserType) => void
    unfollow: (user: UserType) => void
    followingInProgress: Array<number>
    currentAuthUserId: null | number
}

const Users: React.FC<PropsType> = (props) => {

    return (

            <div className={styles.usersContainer}>
                <img src={usersSearchBack} alt={''} className={styles.searchBack}/>
                {props.users.map(user => (
                    <User key={user.id}
                          follow={props.follow}
                          unfollow={props.unfollow}
                          user={user}
                          followingInProgress={props.followingInProgress}
                          currentAuthUserId={props.currentAuthUserId}/>))}
            </div>

    );
};


export default Users;