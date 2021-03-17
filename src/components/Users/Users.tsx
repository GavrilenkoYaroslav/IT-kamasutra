import React from 'react';
import {UserType} from '../../redux/reducers/users-reducer';
import User from "./User/User";
import styles from './users.module.css';
import {Row} from "antd";


type PropsType = {
    users: Array<UserType>
    follow: (user: UserType) => void
    unfollow: (user: UserType) => void
    followingInProgress: Array<number>
    currentAuthUserId: null | number
    theme: 'Dark' | null
}

const Users: React.FC<PropsType> = (props) => {

    return (
        <>
            {!!props.users.length &&
            <div className={`${styles.usersContainer} ${props.theme ? 'dark' : ''}`}>
                <Row gutter={[15,15]} style={{height: '100%'}}>
                {props.users.map(user => (
                    <User key={user.id}
                          follow={props.follow}
                          unfollow={props.unfollow}
                          user={user}
                          theme={props.theme}
                          followingInProgress={props.followingInProgress}
                          currentAuthUserId={props.currentAuthUserId}/>))}
                </Row>
            </div>}
        </>
    );
};


export default Users;