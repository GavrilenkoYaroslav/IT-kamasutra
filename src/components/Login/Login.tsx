import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import LoginForm from "./LoginForm";
import styles from "./Login.module.css";
import {Button, Col, Row} from "antd";
import Wallpaper from "../Wallpaper/Wallpaper";


const Login: React.FC = () => {

    const id = useSelector((state: AppStateType) => state.auth.id);
    const loginError = useSelector((state: AppStateType) => state.auth.loginError);
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const history = useHistory();

    if (id) {
        return <Redirect to='/profile'/>
    }

    return (
        <>
            <Wallpaper/>
            <Button type={'link'} onClick={ () => history.push('/users')}>Go to users</Button>
            <Row justify='center' align={'middle'}>
                <Col span={14}>
                    <div className={styles.container}>
                        <div className={styles.title}>
                <h1>Log In</h1>
                        </div>
                <LoginForm captchaUrl={captchaUrl} loginError={loginError}/>
                    </div>
                </Col>
            </Row>
        </>
    );
};
export default Login;



