import React from 'react';
import styles from './Post.module.css';
import userLogo from '../../../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg'
import like from '../../../../Images/like.png'


type PropsType = {
    message: string
    likesCount: number
    avatar: string|null
    theme: 'Dark' | null
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={`${styles.Post} ${props.theme ? 'dark' : ''}`}>
            <div className={styles.avatar}>
                <img src={props.avatar || userLogo} alt={''}/>
            </div>
            <div className={styles.Message}>
                {props.message}
            </div>
            <div className={styles.Like}>
                <img src={like} alt={''} className={styles.heart}/> {props.likesCount}
            </div>
        </div>

    );
};

export default Post;