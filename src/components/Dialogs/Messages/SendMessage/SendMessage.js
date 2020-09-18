import React from 'react';
import styles from './SendMessage.module.css';
import {messageTextChangeActionCreator, sendMessageActionCreator} from "../../../../redux/reducers/dialogs-reducer";


const SendMessage = (props) => {

    let messageTextChange = (e)=> {
      let text = e.target.value;
      props.messageTextChange(text);
    };

    let sendMessage = () =>{
        props.sendMessage();
    };

    return (
        <div className={styles.sendMessage}>
            <textarea placeholder={'enter your message'} onChange={ messageTextChange } value={props.newMessageText}/>
            <button onClick={ sendMessage }>Send message</button>
        </div>
    );
};

export default SendMessage;