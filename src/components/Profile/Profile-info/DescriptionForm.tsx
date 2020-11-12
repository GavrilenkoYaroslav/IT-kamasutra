import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import styles from './DescriptionForm.module.css';
import {CustomInput, CustomTextarea} from "../../common/customElements/Inputs";
import {required} from "../../../utils/validators";
import {ProfileContactsType} from "../../../redux/reducers/auth-reducer";

export type DescriptionFormDataType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: ProfileContactsType
}

const DescriptionForm: React.FC<InjectedFormProps<DescriptionFormDataType,{}>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.form}>
            <div>
                <Field name={'fullName'} component={CustomInput} validate={[required]} placeholder={'Full name'}/>
            </div>
            <div>
                Looking for a job <Field name={'lookingForAJob'} component={'input'} type={'checkbox'}/>
            </div>
            <div>
                <Field name={'lookingForAJobDescription'} component={CustomTextarea} validate={[required]} placeholder={'My skills'}/>
            </div>
            <div>
                <Field name={'aboutMe'} component={CustomTextarea} validate={[required]} placeholder={'about me'}/>
            </div>
            <div>
                <Field name={'contacts.facebook'} component={CustomInput} placeholder={'facebook'}/>
            </div>
            <div>
                <Field name={'contacts.vk'} component={CustomInput} placeholder={'vk'}/>
            </div>
            <div>
                <Field name={'contacts.instagram'} component={CustomInput} placeholder={'instagram'}/>
            </div>
            <div>
                <Field name={'contacts.github'} component={CustomInput} placeholder={'github'}/>
            </div>
            <div>
                <Field name={'contacts.website'} component={CustomInput} placeholder={'website'}/>
            </div>
            <div>
                <Field name={'contacts.twitter'} component={CustomInput} placeholder={'twitter'}/>
            </div>
            <div>
                <Field name={'contacts.youtube'} component={CustomInput} placeholder={'youtube'}/>
            </div>
            <div>
                <Field name={'contacts.mainLink'} component={CustomInput} placeholder={'link'}/>
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

export default reduxForm<DescriptionFormDataType, {}>({form: 'description'})(DescriptionForm);