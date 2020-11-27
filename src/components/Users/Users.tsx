import React from 'react';
import {UserType} from '../../redux/reducers/users-reducer';
import User from "./User/User";
import styles from './users.module.css';


type PropsType = {
    users: Array<UserType>
    follow: (user: UserType) => void
    unfollow: (user: UserType) => void
    followingInProgress: Array<number>
    currentAuthUserId: null | number
}

const Users: React.FC<PropsType> = (props) => {

    return (
        <>
            {!!props.users.length &&
            <div className={styles.usersContainer}>
                {props.users.map(user => (
                    <User key={user.id}
                          follow={props.follow}
                          unfollow={props.unfollow}
                          user={user}
                          followingInProgress={props.followingInProgress}
                          currentAuthUserId={props.currentAuthUserId}/>))}
            </div>}
        </>
    );
};


export default Users;