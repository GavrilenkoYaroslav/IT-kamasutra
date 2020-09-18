import React from 'react';
import styles from './Posts.module.css';
import Post from './Post/Post'
import AddPostContainer from "./AddPost/AddPostContainer";

const Posts = (props) => {
    let postElements = props.postData.map( post => <Post message={post.post} likesCount={post.likesCount}/>);

    return(
        <div className={styles.Posts}>
            <AddPostContainer />
            <div>
                <div className={styles.title}><b>My posts</b></div>
                {postElements}
            </div>
        </div>
    );
};

export default Posts;