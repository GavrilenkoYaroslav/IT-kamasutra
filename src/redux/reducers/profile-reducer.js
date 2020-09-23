const POST_TEXT_CHANGE = 'POST_TEXT_CHANGE';
const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    postData: [
        {id: 1, post: 'Hi, how are you?', likesCount: '9'},
        {id: 2, post: 'Working hard.', likesCount: '15'}
    ],
    newPostText: '',
    profile: null
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let postId = state.postData.length + 1;
            let newPost = {
                id: postId,
                post: state.newPostText,
                likesCount: 0
            };

            return {...state, newPostText : '', postData : [newPost ,...state.postData]};


        }
        case POST_TEXT_CHANGE: {
            return {...state, newPostText : action.value};

        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        default:
            return state;
    }

};

export const setUserProfile = (profile) => {
  return { type: SET_USER_PROFILE, profile }
};

export const addPostActionCreator = () => {
    return { type: ADD_POST };
};

export const postTextChangeActionCreator = (text) => {
    return {
        type: POST_TEXT_CHANGE,
        value: text
    }
};

export default profileReducer;