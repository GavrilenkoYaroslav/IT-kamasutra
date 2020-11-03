import React from 'react';
import styles from './Posts.module.css';
import Post from './Post/Post'
import AddPostForm, {PostDataType} from "./AddPost/AddPostForm";
import {PostType} from "../../../redux/reducers/profile-reducer";

type PropsType = {
    addPost: (post: string) => void
    postData: Array<PostType>
    resetForm: () => void
}

const Posts: React.FC<PropsType> = (props) => {

    const onSubmit = (post: PostDataType) => {
        props.addPost(post.postMessage);
        props.resetForm();
    };

    const postElements = props.postData.map(post => <Post message={post.post} likesCount={post.likesCount}
                                                          key={post.id}/>);

    return (
        <div className={styles.Posts}>
            <AddPostForm onSubmit={onSubmit}/>
            <div>
                <div className={styles.title}><b>My posts</b></div>
                {postElements}
            </div>
        </div>
    );
};

export default Posts;