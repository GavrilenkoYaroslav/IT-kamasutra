import React from 'react';
import styles from './Messages.module.css';
import Message from "./Message/Message";
import SendMessageForm, {MessageFormDataType} from './SendMessage/SendMessageForm'
import {MessageType} from "../../../redux/reducers/dialogs-reducer";

type PropsType = {
    MessagesData: Array<MessageType>
    sendMessage: (message: string)=>void
    resetForm: ()=>void
}

const Messages: React.FC<PropsType> = (props) => {

    const onSubmit = (formData: MessageFormDataType) => {
      props.sendMessage(formData.message);
      props.resetForm();
    };

    const MessagesElements = props.MessagesData.map( message => <Message message={message.message} id={message.id} key={message.id}/>);

    return(
        <div className={styles.messages}>
            {MessagesElements}
            <SendMessageForm onSubmit={ onSubmit }/>
        </div>
    );
};

export default Messages;