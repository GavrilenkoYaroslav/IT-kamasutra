import React from 'react';
import styles from './Posts.module.css';
import Post from './Post/Post'
import AddPost from "./AddPost/AddPost";
import {PostType} from "../../../redux/reducers/profile-reducer";

type PropsType = {
    addPost: (post: string) => void
    postData: Array<PostType>
    isMyProfile: boolean
    profileFullName: string
    avatar: string|null
    theme: 'Dark' | null
}

const Posts: React.FC<PropsType> = (props) => {

    const postElements = props.postData.map(post => <Post theme={props.theme} avatar={props.avatar} message={post.post} likesCount={post.likesCount}
                                                          key={post.id}/>);

    return (
        <div className={styles.Posts}>
            {props.isMyProfile && <AddPost theme={props.theme} addPost={props.addPost}/>}
            <div>
                <div className={`${styles.title} ${props.theme ? 'dark' : ''}`}>
                    {props.isMyProfile? <b>My posts</b> : <b>{props.profileFullName}'s posts</b>}
                    </div>
                {postElements}
            </div>
        </div>
    );
};

export default Posts;