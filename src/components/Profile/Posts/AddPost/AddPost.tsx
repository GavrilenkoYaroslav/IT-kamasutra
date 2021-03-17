import React, {ChangeEvent, useState} from 'react';
import {Button, Input} from 'antd';
import styles from './AddPost.module.css'
import addPostBack from '../../../../Images/addPostBack.png'

const { TextArea } = Input;

type PropsType = {
    addPost: (post: string) => void
    theme: 'Dark' | null
}

const AddPost: React.FC<PropsType> = (props) => {

    const [newPost, setNewPost] = useState('');

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewPost(e.target.value);
    };

    const onAddPost = () => {
        if (newPost === '') return;
        props.addPost(newPost);
        setNewPost('');
    };

    return (
        <div className={styles.addPostContainer}>
            <img src={addPostBack} alt={''} className={styles.addPostBack}/>
        <TextArea
            className={props.theme ? 'dark' : ''}
            value={newPost}
            onChange={ onPostChange }
            placeholder="Share something with your friends..."
            autoSize={{ minRows: 3, maxRows: 5 }}
        />
            <Button onClick={ onAddPost }>Add post</Button>
            </div>

    );
};

export default AddPost;