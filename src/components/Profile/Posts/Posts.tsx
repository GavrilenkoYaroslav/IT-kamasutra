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
}

const Posts: React.FC<PropsType> = (props) => {

    const postElements = props.postData.map(post => <Post avatar={props.avatar} message={post.post} likesCount={post.likesCount}
                                                          key={post.id}/>);

    return (
        <div className={styles.Posts}>
            {props.isMyProfile && <AddPost addPost={props.addPost}/>}
            <div>
                <div className={styles.title}>
                    {props.isMyProfile? <b>My posts</b> : <b>{props.profileFullName}'s posts</b>}
                    </div>
                {postElements}
            </div>
        </div>
    );
};

export default Posts;