import React from 'react';
import {connect} from "react-redux";
import Posts from "./Posts";
import {addPostActionCreator} from "../../../redux/reducers/profile-reducer";

const mapStateToProps = (state) => {
    return {
        postData : state.profilePage.postData
    }
};

const mapDispatchToProps = {
    addPostActionCreator
};

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;