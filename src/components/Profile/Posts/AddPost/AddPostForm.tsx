import React from 'react';
import styles from './AddPost.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/customElements/Inputs";
import {maxLengthCreator, required} from "../../../../utils/validators";

const maxLength30 = maxLengthCreator(30);

export type PostDataType = {
    postMessage: string
}

const AddPostForm: React.FC<InjectedFormProps<PostDataType, {}>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit} className={styles.form}>
            <Field component={Textarea} name={'postMessage'}
                   placeholder={'Enter your post'} validate={[required, maxLength30]}/>
            <button>Add post</button>
        </form>
    );
};

export default reduxForm<PostDataType, {}>({form: 'addPostForm'})(AddPostForm);