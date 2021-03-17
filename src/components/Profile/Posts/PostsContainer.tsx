import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Posts from "./Posts";
import {addPostActionCreator, PostType} from "../../../redux/reducers/profile-reducer";
import {AppStateType} from "../../../redux/redux-store";

type PropsType = {
    isMyProfile: boolean
    profileFullName: string
    theme: 'Dark' | null
}

const PostsContainer: React.FC<PropsType> = (props) => {

    const postData: Array<PostType> = useSelector((state: AppStateType) => state.profilePage.postData);
    const avatar = useSelector((state: AppStateType) => state.profilePage.profile && state.profilePage.profile.photos.small);
    const dispatch = useDispatch();
    const addPost = useCallback((post) => dispatch(addPostActionCreator(post)), [dispatch]);

    return (
        <Posts avatar={avatar} theme={props.theme} isMyProfile={props.isMyProfile} addPost={addPost}
               postData={postData} profileFullName={props.profileFullName}/>
    )
};

export default PostsContainer;
