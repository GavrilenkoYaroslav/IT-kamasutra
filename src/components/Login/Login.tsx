import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import LoginForm from "./LoginForm";
import styles from "./Login.module.css";
import {Button, Col, Row} from "antd";


const Login: React.FC = () => {

    const id = useSelector((state: AppStateType) => state.auth.id);
    const loginError = useSelector((state: AppStateType) => state.auth.loginError);
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const theme = useSelector((state: AppStateType) => state.app.theme);
    const history = useHistory();

    if (id) {
        return <Redirect to='/profile'/>
    }

    return (
        <>
            <Row justify='center' align={'middle'} style={{height: '100vh'}}>
                <Col span={10}>
                    <div className={`${styles.container} ${theme ? 'dark_glass' : ''}`}>
                        <div className={styles.title}>
                <h1>Log In</h1>
                        </div>
                <LoginForm captchaUrl={captchaUrl} loginError={loginError}/>
                    </div>
                    <div className={styles.goToUsersButton}>
                        <Button type={'link'} onClick={ () => history.push('/users')}><b>Go to users</b></Button>
                    </div>
                </Col>
            </Row>
        </>
    );
};
export default Login;



