import React from 'react';
import styles from './Messages.module.css';
import Message from "./Message/Message";
import SendMessageForm from './SendMessage/SendMessageForm'


const Messages = (props) => {

    const onSubmit = (formData) => {
      props.sendMessageActionCreator(formData.message);
    };

    let MessagesElements = props.MessagesData.map( message => <Message message={message.message} id={message.id} key={message.id}/>);

    return(
        <div className={styles.messages}>
            {MessagesElements}
            <SendMessageForm onSubmit={ onSubmit }/>
        </div>
    );
};

export default Messages;