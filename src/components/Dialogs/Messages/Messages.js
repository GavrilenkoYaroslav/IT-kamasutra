import React from 'react';
import styles from './Messages.module.css';
import Message from "./Message/Message";
import SendMessageContainer from "./SendMessage/SendMessageContainer";

const Messages = (props) => {

    let MessagesElements = props.MessagesData.map( message => <Message message={message.message} id={message.id}/>);

    return(
        <div className={styles.messages}>
            {MessagesElements}
            <SendMessageContainer/>
        </div>
    );
};

export default Messages;