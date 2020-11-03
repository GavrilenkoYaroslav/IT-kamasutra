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

const PostsContainer: React.FC = () => {

    const postData: Array<PostType> = useSelector((state: AppStateType) => state.profilePage.postData);
    const dispatch = useDispatch();
    const addPost = useCallback((post) => dispatch(addPostActionCreator(post)), [dispatch]);
    const resetForm = useCallback(() => dispatch(reset('addPostForm')), [dispatch]);

    return (
        <Posts addPost={addPost} postData={postData} resetForm={resetForm}/>
    )
};

export default PostsContainer;
