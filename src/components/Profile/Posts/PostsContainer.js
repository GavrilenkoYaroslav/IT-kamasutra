import React from 'react';
import styles from './Posts.module.css';
import Post from './Post/Post'
import AddPostContainer from "./AddPost/AddPostContainer";
import {connect} from "react-redux";
import Posts from "./Posts";

const mapStateToProps = (state) => {
    return {
        postData : state.profilePage.postData
    }
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//
//     }
// };

const PostsContainer = connect(mapStateToProps)(Posts);

export default PostsContainer;