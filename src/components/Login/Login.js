import React from 'react';
import {Field, reduxForm} from "redux-form";
import {AuthAPI} from "../../API/API";
import {connect} from "react-redux";
import {authMe} from "../../redux/reducers/auth-reducer";

const Login = (props) => {

    const onSubmit = async (formData) =>{
      await AuthAPI.AuthLogin(formData);
      await props.authMe();
    };

    return <>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={ onSubmit }/>
    </>
};

const mapStatetoProps = (state) => {
    return {

    }
};

export default connect(mapStatetoProps, {authMe})(Login);


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'email'} component={'input'} placeholder={'Login'}/>
            </div>
            <div>
                <Field name={'password'} component={'input'} placeholder={'Password'}/>
            </div>
            <div>
                <Field name={'rememberMe'} component={'input'} type={'checkbox'}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);