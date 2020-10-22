import React from 'react';
import {Field, reduxForm} from "redux-form";
import styles from './DescriptionForm.module.css';
import {Input, Textarea} from "../../common/customElements/Inputs";
import {required} from "../../../utils/validators";

const DescriptionForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.form}>
            <div>
                <Field name={'fullName'} component={Input} validate={[required]} placeholder={'Full name'}/>
            </div>
            <div>
                Looking for a job <Field name={'lookingForAJob'} component={'input'} type={'checkbox'}/>
            </div>
            <div>
                <Field name={'lookingForAJobDescription'} component={Textarea} validate={[required]} placeholder={'My skills'}/>
            </div>
            <div>
                <Field name={'aboutMe'} component={Textarea} validate={[required]} placeholder={'about me'}/>
            </div>
            <div>
                <Field name={'contacts.facebook'} component={Input} placeholder={'facebook'}/>
            </div>
            <div>
                <Field name={'contacts.vk'} component={Input} placeholder={'vk'}/>
            </div>
            <div>
                <Field name={'contacts.instagram'} component={Input} placeholder={'instagram'}/>
            </div>
            <div>
                <Field name={'contacts.github'} component={Input} placeholder={'github'}/>
            </div>
            <div>
                <Field name={'contacts.website'} component={Input} placeholder={'website'}/>
            </div>
            <div>
                <Field name={'contacts.twitter'} component={Input} placeholder={'twitter'}/>
            </div>
            <div>
                <Field name={'contacts.youtube'} component={Input} placeholder={'youtube'}/>
            </div>
            <div>
                <Field name={'contacts.mainLink'} component={Input} placeholder={'link'}/>
            </div>
            <div>
                <button>save</button>
            </div>
            <div className={styles.error}>
            {props.error}
            </div>
        </form>

    );
};

export default reduxForm({form: 'description'})(DescriptionForm);