const POST_TEXT_CHANGE = 'POST_TEXT_CHANGE';
const ADD_POST = 'ADD_POST';

let initialState = {
    postData: [
        {id: 1, post: 'Hi, how are you?', likesCount: '9'},
        {id: 2, post: 'Working hard.', likesCount: '15'}
    ],
    newPostText: ''
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

            return {...state, newPostText : '', postData : [...state.postData, newPost]};


        }
        case POST_TEXT_CHANGE: {
            return {...state, newPostText : action.value};

        }
        default:
            return state;
    }

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