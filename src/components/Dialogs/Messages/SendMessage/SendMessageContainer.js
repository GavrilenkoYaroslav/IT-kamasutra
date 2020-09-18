import React from 'react';
import {messageTextChangeActionCreator, sendMessageActionCreator} from "../../../../redux/reducers/dialogs-reducer";
import SendMessage from "./SendMessage";
import {connect} from "react-redux";


// const SendMessageContainer = (props) => {
//
//     let messageTextChange = (text) => {
//         props.store.dispatch(messageTextChangeActionCreator(text));
//     };
//
//     let sendMessage = () => {
//         props.store.dispatch(sendMessageActionCreator());
//     };
//
//     return (
//         <SendMessage messageTextChange={messageTextChange} sendMessage={sendMessage}
//                      newMessageText={props.store.getState().dialogsPage.newMessageText}/>
//     );
// };

let mapStateToProps = (state) => {
    return {
        newMessageText: state.dialogsPage.newMessageText
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        messageTextChange: (text) => {
            dispatch(messageTextChangeActionCreator(text))
        },
        sendMessage: () => {
            dispatch(sendMessageActionCreator())
        }
    }
};

const SendMessageContainer = connect(mapStateToProps, mapDispatchToProps)(SendMessage);

export default SendMessageContainer;