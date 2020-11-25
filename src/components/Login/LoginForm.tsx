import React, {useEffect, useState} from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import {useDispatch} from "react-redux";
import {login, loginErrorType} from "../../redux/reducers/auth-reducer";


export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
type PropsType = {
    captchaUrl: string
    loginError: loginErrorType
}

const LoginForm: React.FC<PropsType> = (props) => {

    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
     setErrorMessage(props.loginError.message)
    }, [props.loginError]);

    const onFinish = ( formData: LoginFormDataType ) => {
        dispatch(login(formData));
    };


    const onFieldsChange = () => {
        setErrorMessage('');
    };


    return (
        <Form
            layout='vertical'
              name="login"
              initialValues={{ remember: true }}
              onFieldsChange={ onFieldsChange }
              onFinish={onFinish}>

            <Form.Item
                label="Email"
                required={false}
                name="email"
                validateStatus={errorMessage ? 'error' : undefined}
                rules={[{ required: true, message: 'Please enter your email' },
                    {type:'email', message:'Email is not valid'}]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                required={false}
                name="password"
                validateStatus={errorMessage ? 'error' : undefined}
                help={errorMessage ? errorMessage : undefined}
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

            <Form.Item>
                <Button style={{width: '30%', display: 'block', margin: '0 auto'}}
                        type="primary" htmlType="submit">
                    Log In
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
