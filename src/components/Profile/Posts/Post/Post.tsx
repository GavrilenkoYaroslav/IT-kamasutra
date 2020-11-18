import React from 'react';
import styles from './Post.module.css';
import userLogo from '../../../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg'

type PropsType = {
    message: string
    likesCount: number
    avatar: string|null
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={styles.Post}>
            <div className={styles.avatar}>
                <img src={props.avatar || userLogo} alt={''}/>
            </div>
            <div className={styles.Message}>
                {props.message}
            </div>
            <div className={styles.Like}>
                <span>Like!</span> {props.likesCount}
            </div>
        </div>

    );
};

export default Post;