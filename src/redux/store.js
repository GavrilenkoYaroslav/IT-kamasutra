import profileReducer from "./reducers/profile-reducer";
import dialogsReducer from "./reducers/dialogs-reducer";

// const POST_TEXT_CHANGE = 'POST_TEXT_CHANGE';
// const ADD_POST = 'ADD_POST';
// const SEND_MESSAGE = 'SEND_MESSAGE';
// const MESSAGE_TEXT_CHANGE = 'MESSAGE_TEXT_CHANGE';

export let store = {
    _state: {
        profilePage: {
            postData: [
                {id: 1, post: 'Hi, how are you?', likesCount: '9'},
                {id: 2, post: 'Working hard.', likesCount: '15'}
            ],
            newPostText: ''
        },
        dialogsPage: {
            MessagesData: [
                {id: '1', message: 'Hi!'},
                {id: '2', message: 'How are u?'},
                {id: '3', message: 'Fuck u'},
            ],
            DialogsData: [
                {
                    id: '1',
                    name: 'Dima',
                    logoSrc: 'https://i.pinimg.com/280x280_RS/91/a3/2c/91a32c5d5d8fd2a5c81c6874a65a4fb4.jpg'
                },
                {
                    id: '2',
                    name: 'Alex',
                    logoSrc: 'https://www.autoalloys.com/content/images/thumbs/0003760_19-ava-memphis-hyper-silver-alloy-wheels_550.png'
                },
                {
                    id: '3',
                    name: 'Vanya',
                    logoSrc: 'https://whatsism.com/uploads/posts/2018-07/1530546770_rmk_vdjbx10.jpg'
                },
                {id: '4', name: 'Viktor', logoSrc: 'https://archilab.online/images/1/123.jpg'},
                {id: '5', name: 'Andrew', logoSrc: 'https://cs16planet.ru/steam-avatars/images/avatar2700.jpg'}
            ],
            newMessageText: ''
        },

    },

    _callSubscriber() {
        console.log('render')
    },

    getState() {
        return this._state
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);

        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

        this._callSubscriber(this._state);

        // if (action.type === ADD_POST) {
        //     this.addPost();
        // } else if (action.type === POST_TEXT_CHANGE) {
        //     this.postTextChange(action.value);
        // } else if (action.type === SEND_MESSAGE) {
        //     this.sendMessage();
        // } else if (action.type === MESSAGE_TEXT_CHANGE) {
        //     this.messageTextChange(action.value);
        // }
    }

    // addPost() {
    //     let postId = this._state.profilePage.postData.length + 1;
    //     let newPost = {
    //         id: postId,
    //         post: this._state.profilePage.newPostText,
    //         likesCount: 0
    //     };
    //     this._state.profilePage.postData.push(newPost);
    //     this._state.profilePage.newPostText = '';
    //     this.callSubscriber(this._state);
    // },
    //
    // postTextChange(value) {
    //     this._state.profilePage.newPostText = value;
    //     this.callSubscriber(this._state);
    // },
    //
    // sendMessage() {
    //     let messageId = this._state.dialogsPage.MessagesData.length + 1;
    //     let newMessage = {
    //         id: messageId,
    //         message: this._state.dialogsPage.newMessageText
    //     };
    //     this._state.dialogsPage.MessagesData.push(newMessage);
    //     this._state.dialogsPage.newMessageText = '';
    //     this.callSubscriber(this._state);
    // },
    //
    // messageTextChange(value) {
    //     this._state.dialogsPage.newMessageText = value;
    //     this.callSubscriber(this._state);
    // },

};



// let callSubscriber;
// let state = {
//     profilePage :{
//         postData: [
//             {id: 1, post: 'Hi, how are you?', likesCount: '9'},
//             {id: 2, post: 'Working hard.', likesCount: '15'}
//         ],
//         newPostText : ''
//     },
//     dialogsPage : {
//         MessagesData: [
//             {id: '1', message: 'Hi!'},
//             {id: '2', message: 'How are u?'},
//             {id: '3', message: 'Fuck u'},
//         ],
//         DialogsData: [
//             {id: '1', name: 'Dima', logoSrc : 'https://i.pinimg.com/280x280_RS/91/a3/2c/91a32c5d5d8fd2a5c81c6874a65a4fb4.jpg'},
//             {id: '2', name: 'Alex', logoSrc: 'https://www.autoalloys.com/content/images/thumbs/0003760_19-ava-memphis-hyper-silver-alloy-wheels_550.png'},
//             {id: '3', name: 'Vanya', logoSrc : 'https://whatsism.com/uploads/posts/2018-07/1530546770_rmk_vdjbx10.jpg'},
//             {id: '4', name: 'Viktor', logoSrc : 'https://archilab.online/images/1/123.jpg'},
//             {id: '5', name: 'Andrew', logoSrc : 'https://cs16planet.ru/steam-avatars/images/avatar2700.jpg'}
//         ],
//         newMessageText : ''
//     },
//
// };
//
//
// export let addPost = () => {
//     let postId = state.profilePage.postData.length +1;
//     let newPost = {
//         id : postId,
//         post : state.profilePage.newPostText,
//         likesCount : 0
//     };
//   state.profilePage.postData.push(newPost);
//   state.profilePage.newPostText ='';
//   callSubscriber(state);
// };
//
// export let postTextChange = (value)=> {
//   state.profilePage.newPostText = value;
//   callSubscriber(state);
// };
//
// export let sendMessage = () => {
//     let messageId = state.dialogsPage.MessagesData.length +1;
//     let newMessage = {
//         id : messageId,
//         message : state.dialogsPage.newMessageText
//     };
//     state.dialogsPage.MessagesData.push(newMessage);
//     state.dialogsPage.newMessageText = '';
//     callSubscriber(state);
// };
//
// export let messageTextChange = (value) => {
//     state.dialogsPage.newMessageText = value;
//     callSubscriber(state);
// };
//
// export let subscribe = (observer)=> {
//     callSubscriber = observer;
// };

// export default state;