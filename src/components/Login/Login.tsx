import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {Input} from "../common/customElements/Inputs";
import {required} from "../../utils/validators";
import {login} from "../../redux/reducers/auth-reducer";
import {Redirect} from "react-router-dom";
import styles from './Login.module.css'
import {AppStateType} from "../../redux/redux-store";


const Login: React.FC = () => {

    const id = useSelector((state: AppStateType) => state.auth.id);
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const dispatch = useDispatch();

    const onSubmit = (formData: LoginFormDataType) => {
       dispatch(login(formData));
    };

    if (id) {
        return <Redirect to='/profile'/>
    }

    return <>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </>
};
export default Login;

// const mapStateToProps = (state: AppStateType) => {
//     return {
//         id: state.auth.id,
//         captchaUrl : state.auth.captchaUrl
//     }
// };
//
// export default connect(mapStateToProps, {login})(Login);


type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
type LoginOwnPropsType = {
    captchaUrl: string
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginOwnPropsType> & LoginOwnPropsType> = (props) => {
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
                remember me<Field name={'rememberMe'} component={Input} type={'checkbox'}/>
            </div>
            {props.error && <div className={styles.loginFormError}>
                {props.error}
            </div>}
            {props.captchaUrl && <div>
                <img src={props.captchaUrl} alt={''}/>
                <Field name={'captcha'} component={Input} validate={[required]} placeholder={'Captcha'}/>
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<LoginFormDataType, LoginOwnPropsType>({form: 'login'})(LoginForm);