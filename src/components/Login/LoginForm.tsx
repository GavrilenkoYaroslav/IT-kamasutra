// import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React, {useEffect, useState} from "react";
// import {CustomInput} from "../common/customElements/Inputs";
// import {required} from "../../utils/validators";
// import styles from "./Login.module.css";
import { Form, Input, Button, Checkbox } from 'antd';
import {useDispatch} from "react-redux";
import {login} from "../../redux/reducers/auth-reducer";

// const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },
// };
// const tailLayout = {
//     wrapperCol: {span: 16 },
// };


export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
type PropsType = {
    captchaUrl: string
    loginErrorMessage: string
}

const LoginForm: React.FC<PropsType> = (props) => {
//TODO: need to fix it
//     const [errorMessage, setErrorMessage] = useState(props.loginErrorMessage);
    const [, forceUpdate] = useState();
    const [form] = Form.useForm();

debugger
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        forceUpdate({});
    }, []);

    const onFinish = ( formData: LoginFormDataType ) => {
        dispatch(login(formData));
    };


    const onFieldsChange = () => {
        // setErrorMessage('');
    };


    return (
        <Form
            form={form}
            layout='vertical'
              name="login"
              initialValues={{ remember: true }}
              onFieldsChange={ onFieldsChange }
              onFinish={onFinish}>

            <Form.Item
                label="Email"
                required={false}
                name="email"
                validateStatus={props.loginErrorMessage ? 'error' : undefined}
                rules={[{ required: true, message: 'Please enter your email' },
                    {type:'email', message:'Email is not valid'}]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                required={false}
                name="password"
                validateStatus={props.loginErrorMessage ? 'error' : undefined}
                help={props.loginErrorMessage ? props.loginErrorMessage : undefined}
                rules={[{ required: true, message: 'Please enter your password' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item  name="rememberMe" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {props.captchaUrl && <><div>
                <img src={props.captchaUrl} alt={''}/>
                </div>
            <Form.Item
                required={false}
                name="captcha"
                rules={[{ required: true, message: 'Captcha is required!' }]}>
                <Input />
            </Form.Item></>}

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Log In
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;

// const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginOwnPropsType> & LoginOwnPropsType> = (props) => {
// export const LoginReduxForm = reduxForm<LoginFormDataType, LoginOwnPropsType>({form: 'login'})(LoginForm);
// <form onSubmit={props.handleSubmit}>
//     <div>
//         <Field name={'email'} component={CustomInput} validate={[required]} placeholder={'Email'}/>
//     </div>
//     <div>
//         <Field name={'password'} type={'password'} component={CustomInput} validate={[required]}
//                placeholder={'Password'}/>
//     </div>
//     <div>
//         remember me<Field name={'rememberMe'} component={CustomInput} type={'checkbox'}/>
//     </div>
//     {props.error && <div className={styles.loginFormError}>
//         {props.error}
//     </div>}
//     {props.captchaUrl && <div>
//         <img src={props.captchaUrl} alt={''}/>
//         <Field name={'captcha'} component={CustomInput} validate={[required]} placeholder={'Captcha'}/>
//     </div>}
//     <div>
//         <button>Login</button>
//     </div>
// </form>