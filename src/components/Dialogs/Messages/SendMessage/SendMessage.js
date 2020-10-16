import React from 'react';
import styles from './SendMessage.module.css';
import {Field, reduxForm} from "redux-form";


const SendMessageForm = (props) => {

    return (
        <form className={styles.sendMessage} onSubmit={props.handleSubmit}>
            <Field name={'message'} component={'textarea'} placeholder={'enter your message'}/>
            <button>Send message</button>
        </form>
    );
};

export default reduxForm({form : 'sendMessageForm'})(SendMessageForm);