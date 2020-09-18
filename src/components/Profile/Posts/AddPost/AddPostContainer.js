import React from 'react';
import {addPostActionCreator, postTextChangeActionCreator} from "../../../../redux/reducers/profile-reducer";
import AddPost from "./AddPost";
import {connect} from "react-redux";


// const AddPostContainer = (props) => {
//
//     let postTextChange = (text) => {
//         props.store.dispatch(postTextChangeActionCreator(text));
//     };
//
//     let addPost = () => {
//         props.store.dispatch(addPostActionCreator());
//     };
//
//     return (
//        <AddPost postTextChange={postTextChange} addPost={addPost} newPostText={props.store.getState().profilePage.newPostText}/>
//     );
// };

let mapStateToProps = (state) => {
  return {
      newPostText : state.profilePage.newPostText
  }
};

let mapDispatchToProps = (dispatch) => {
    return {
        postTextChange : (text) => { dispatch(postTextChangeActionCreator(text)) },
        addPost : () => { dispatch(addPostActionCreator()) }
    }
};


const AddPostContainer = connect(mapStateToProps, mapDispatchToProps)(AddPost);

export default AddPostContainer;