import React from 'react';
import styles from './Post.module.css';

const Post = (props) => {
    return (
        <div className={styles.Post}>
            <div className={styles.avatar}>
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqc0qwLkD2-SHZlWMr7z7lRvzHQfxaXk_TLw&usqp=CAU'/>
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