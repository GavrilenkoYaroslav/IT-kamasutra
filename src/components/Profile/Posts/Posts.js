import React from 'react';
import styles from './Posts.module.css';
import Post from './Post/Post'
import AddPostForm from "./AddPost/AddPostForm";

const Posts = (props) => {

    const onSubmit = (post) => {
      props.addPostActionCreator(post.postMessage)
    };

    let postElements = props.postData.map( post => <Post message={post.post} likesCount={post.likesCount} key={post.id}/>);

    return(
        <div className={styles.Posts}>
            <AddPostForm onSubmit={ onSubmit } />
            <div>
                <div className={styles.title}><b>My posts</b></div>
                {postElements}
            </div>
        </div>
    );
};

export default Posts;