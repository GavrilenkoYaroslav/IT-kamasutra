import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Posts from "./Posts";
import {addPostActionCreator, PostType} from "../../../redux/reducers/profile-reducer";
import {AppStateType} from "../../../redux/redux-store";
import {reset} from "redux-form";

// type MapStatePropsType = {
//     postData: Array<PostType>
// }
// type MapDispatchPropsType = {
//     addPostActionCreator: (post: string) => void
// }
//
// const mapStateToProps = (state: AppStateType): MapStatePropsType => {
//     return {
//         postData : state.profilePage.postData
//     }
// };
//
// const mapDispatchToProps: MapDispatchPropsType = {
//     addPostActionCreator
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(Posts);
type PropsType = {
    isMyProfile: boolean
    profileFullName: string
}

const PostsContainer: React.FC<PropsType> = (props) => {

    const postData: Array<PostType> = useSelector((state: AppStateType) => state.profilePage.postData);
    const avatar = useSelector((state: AppStateType) => state.profilePage.profile && state.profilePage.profile.photos.small);
    const dispatch = useDispatch();
    const addPost = useCallback((post) => dispatch(addPostActionCreator(post)), [dispatch]);
    const resetForm = useCallback(() => dispatch(reset('addPostForm')), [dispatch]);

    return (
        <Posts avatar={avatar} isMyProfile={props.isMyProfile} addPost={addPost}
               postData={postData} resetForm={resetForm} profileFullName={props. profileFullName}/>
    )
};

export default PostsContainer;
