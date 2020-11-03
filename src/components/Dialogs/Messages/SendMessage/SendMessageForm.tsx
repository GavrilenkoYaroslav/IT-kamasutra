import React from 'react';
import styles from './SendMessage.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/customElements/Inputs";
import {maxLengthCreator, required} from "../../../../utils/validators";

const maxLength30 = maxLengthCreator(30);

export type MessageFormDataType = {
    message: string
}

const SendMessageForm: React.FC<InjectedFormProps<MessageFormDataType>> = (props) => {

    return (
        <form className={styles.sendMessage} onSubmit={props.handleSubmit}>
            <Field name={'message'} component={Textarea}
                   placeholder={'enter your message'} validate={[required, maxLength30]}/>
            <button>Send message</button>
        </form>
    );
};

export default reduxForm<MessageFormDataType>({form : 'sendMessageForm'})(SendMessageForm);