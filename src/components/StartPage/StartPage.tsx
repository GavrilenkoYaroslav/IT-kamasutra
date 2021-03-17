import React from 'react';
import {Col, Row} from "antd";
import styles from './StartPage.module.css'
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

const StartPage = () => {

    const theme = useSelector((state: AppStateType) => state.app.theme);

    return (
        <Row justify='center' align={'middle'} style={{height: '100%'}}>
            <Col span={16}>
                <div className={`${styles.container} ${theme ? 'dark' : ''}`}>
                        <h1>Hi there!</h1>
                    <p>This App is still in progress, and unfortunately you can't try
                        all functionality because of authorisation, but if you are
                    interested - you still can check the code!)
                        Also make your choice at the top of the screen )</p>
                </div>
            </Col>
        </Row>
    );
};

export default StartPage;