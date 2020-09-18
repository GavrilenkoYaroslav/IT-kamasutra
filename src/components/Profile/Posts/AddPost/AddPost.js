import React from 'react';
import styles from './AddPost.module.css';
import {addPostActionCreator, postTextChangeActionCreator} from "../../../../redux/reducers/profile-reducer";


const AddPost = (props) => {

    let postTextChange = (e) => {
        let text = e.target.value;
        props.postTextChange(text);
        // props.dispatch(postTextChangeActionCreator(text));
    };

    let addPost = () => {
        props.addPost();
    };

    return (
        <div className={styles.form}>
            <textarea onChange={postTextChange} value={props.newPostText}/>
            <button onClick={addPost}>Add post</button>
        </div>
    );
};

export default AddPost;