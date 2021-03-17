import React, {useEffect} from 'react';
import styles from './Head.module.css';
import Preloader from "../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import avatar from '../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg';
import {InitialAuthStateType, ProfileType} from "../../redux/reducers/auth-reducer";
import {Button, Col, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import light from '../../Images/Light.png';
import dark from '../../Images/Dark.png';
import {switchTheme} from "../../redux/reducers/app-reducer";
import star from '../../Images/starOfDeath.png';

type PropsType = {
    auth: InitialAuthStateType
    logout: () => void
    setUserProfile: (profile: ProfileType | null) => void
}

const Header: React.FC<PropsType> = (props) => {

    const theme = useSelector((state: AppStateType) => state.app.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!!theme) {
            const logo = document.getElementById('logo');
            logo && (logo.style.opacity = '0');
            const starOfDeath = document.getElementById('star');
            starOfDeath && (starOfDeath.style.opacity = '1');
        }
    }, [theme]);

    const selectLightMode = () => {
        dispatch(switchTheme(null));
        const starOfDeath = document.getElementById('star');
        starOfDeath && (starOfDeath.style.opacity = '0');
        const logo = document.getElementById('logo');
        logo && (logo.style.opacity = '1');
    };

    const selectDarkMode = () => {
        dispatch(switchTheme('Dark'));
        const logo = document.getElementById('logo');
        logo && (logo.style.opacity = '0');
        const starOfDeath = document.getElementById('star');
        starOfDeath && (starOfDeath.style.opacity = '1');
    }

    const logoutClick = () => {
        props.logout();
        props.setUserProfile(null);
    };

    return (
        <header className={styles.header}>
            <Row>
                <Col span={3}>
                    <img id={'logo'}
                        src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Tumblr_static_memrise_icon_tumblr%281%29.png'
                        className={styles.logo} alt={''}/>
                    <img id={'star'} src={star} className={styles.star} alt={''}/>
                </Col>
                <Col span={17}>
                    <div className={`${styles.theme} ${theme ? styles.themeOpacityDark : ''}`}>
                        <img src={dark} onClick={selectDarkMode}/>
                        <img src={light} onClick={selectLightMode}/>
                        <span style={theme ? {color: 'indianred'} : {}}>CHOOSE YOUR SIDE</span>
                    </div>
                </Col>
                <Col span={4}>
                    <div className={styles.auth}>
                        {props.auth.isFetching ? <Preloader className={'preloader'}/> : props.auth.id ?
                            <div className={styles.loginBlock}>
                                <div className={styles.avatar}>
                                    <img src={props.auth.logoSrc ? props.auth.logoSrc : avatar} alt={''}/>
                                </div>
                                <div>
                                    <Button type={'link'} onClick={logoutClick}><b>Log out</b></Button>
                                </div>
                                <b style={theme ? {color: 'white'} : {}}>
                                    {props.auth.login}
                                </b>
                            </div>
                            :
                            <NavLink to={'/login'}>
                                <b>Log In</b>
                            </NavLink>}
                    </div>
                </Col>
            </Row>
        </header>
    );
};

export default Header;