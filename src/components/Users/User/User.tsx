import React from 'react';
import styles from './User.module.css';
import userLogo from '../../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg'
import {NavLink} from "react-router-dom";
import {Button, Card, Row} from "antd";
import {UserType} from "../../../redux/reducers/users-reducer";


type PropsType = {
    followingInProgress: Array<number>
    follow: (user: UserType) => void
    unfollow: (user: UserType) => void
    currentAuthUserId: null|number
    user: UserType
}

const User: React.FC<PropsType> = (props) => {
    return (

        <Card bodyStyle={{height: '280px'}} bordered={false} hoverable>
            <Row style={{height: '180px'}}>
            <div className={styles.logo}>
                <NavLink to={`/profile/${props.user.id}`}>
                  <img src={props.user.photos.large || userLogo} alt={''}/>
                 </NavLink>
                 </div>
            </Row>
            <Row justify='center' align='middle'>
                <div className={styles.userName}>
                    <b>{props.user.name}</b>
             </div>
            </Row>
             {props.currentAuthUserId &&
            <div className={styles.followButtonContainer}>
              <Button disabled={props.followingInProgress.some(id => id === props.user.id)}
                       onClick={() => {
                          props[props.user.followed ? 'unfollow' : 'follow'](props.user)
                       }}>{props.user.followed ? 'Unfollow' : 'Follow'}</Button>
              </div>}
        </Card>
    );
};

export default User;