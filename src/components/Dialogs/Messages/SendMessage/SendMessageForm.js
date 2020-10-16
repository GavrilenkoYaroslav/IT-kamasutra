import React from 'react';
import styles from './SendMessage.module.css';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../common/customElements/Inputs";
import {maxLengthCreator, required} from "../../../../utils/validators";


const maxLength30 = maxLengthCreator(30);

const SendMessageForm = (props) => {

    return (
        <form className={styles.sendMessage} onSubmit={props.handleSubmit}>
            <Field name={'message'} component={Textarea}
                   placeholder={'enter your message'} validate={[required, maxLength30]}/>
            <button>Send message</button>
        </form>
    );
};

export default reduxForm({form : 'sendMessageForm'})(SendMessageForm);