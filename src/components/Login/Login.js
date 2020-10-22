import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Input} from "../common/customElements/Inputs";
import {required} from "../../utils/validators";
import {login} from "../../redux/reducers/auth-reducer";
import {Redirect} from "react-router-dom";
import styles from './Login.module.css'


const Login = (props) => {

    const onSubmit = (formData) => {
       props.login(formData);
    };

    if (props.id) {
        return <Redirect to='/profile'/>
    }

    return <>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </>
};

const mapStateToProps = (state) => {
    return {
        id: state.auth.id,
        captchaUrl : state.auth.captchaUrl
    }
};

export default connect(mapStateToProps, {login})(Login);


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'email'} component={Input} validate={[required]} placeholder={'Email'}/>
            </div>
            <div>
                <Field name={'password'} type={'password'} component={Input} validate={[required]}
                       placeholder={'Password'}/>
            </div>
            <div>
                remember me <Field name={'rememberMe'} component={Input} type={'checkbox'}/>
            </div>
            {props.error && <div className={styles.loginFormError}>
                {props.error}
            </div>}
            {props.captchaUrl && <div>
                <img src={props.captchaUrl}/>
                <Field name={'captcha'} component={Input} validate={[required]} placeholder={'Captcha'}/>
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);