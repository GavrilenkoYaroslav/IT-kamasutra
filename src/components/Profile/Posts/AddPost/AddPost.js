import React from 'react';
import styles from './AddPost.module.css';
import {Field, reduxForm} from "redux-form";


const AddPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={styles.form}>
            <Field component={'textarea'} name={'postMessage'}/>
            <button>Add post</button>
        </form>
    );
};

export default reduxForm({form : 'addPostForm'})(AddPostForm);