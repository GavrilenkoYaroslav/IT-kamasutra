import React from 'react';
import styles from './User.module.css';
import userLogo from '../../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg'
import {NavLink} from "react-router-dom";
import {Button, Card, Col, Row} from "antd";
import {UserType} from "../../../redux/reducers/users-reducer";


type PropsType = {
    followingInProgress: Array<number>
    follow: (user: UserType) => void
    unfollow: (user: UserType) => void
    currentAuthUserId: null|number
    user: UserType
    theme: 'Dark' | null
}

const User: React.FC<PropsType> = (props) => {
    return (
        <Col xs={8} xl={6}>
        <Card bodyStyle={{height: '240px'}} className={props.theme ? 'dark bordered' : ''} bordered={!!props.theme} hoverable>
            <div className={styles.photo}>
                <NavLink to={`/profile/${props.user.id}`}>
                  <img src={props.user.photos.large || userLogo} alt={''}/>
                 </NavLink>
                 </div>
                <div className={styles.userName}>
                    <b>{props.user.name}</b>
             </div>
             {props.currentAuthUserId &&
            <div className={styles.followButtonContainer}>
              <Button disabled={props.followingInProgress.some(id => id === props.user.id)}
                       onClick={() => {
                          props[props.user.followed ? 'unfollow' : 'follow'](props.user)
                       }}>{props.user.followed ? 'Unfollow' : 'Follow'}</Button>
              </div>}
        </Card>
        </Col>
    );
};

export default User;