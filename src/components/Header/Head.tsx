import React from 'react';
import styles from './Head.module.css';
import Preloader from "../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import avatar from '../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg';
import {InitialAuthStateType, ProfileType} from "../../redux/reducers/auth-reducer";

type PropsType = {
    auth: InitialAuthStateType
    logout: () => void
    setUserProfile: (profile: ProfileType|null) => void
}

const Header: React.FC<PropsType> = (props) => {

    const logoutClick = () => {
       props.logout();
       props.setUserProfile(null);
    };

    return (
        <header className={styles.Header}>
            <img src='https://assets.awwwards.com/awards/images/2011/12/typeandlogo-11.jpg'/>
            <div className={styles.auth}>
                {props.auth.isFetching ? <Preloader className={styles.preloader}/> : props.auth.id ?
                    <div className={styles.loginBlock}>
                        <div className={styles.avatar}>
                            <img src={props.auth.logoSrc ? props.auth.logoSrc : avatar}/>
                        </div>
                        <div>
                            <button onClick={ logoutClick }>Log out</button>
                        </div>
                        <b>
                            {props.auth.login}
                        </b>
                    </div>
                    :
                    <NavLink to={'/login'}>
                        <b>Login</b>
                    </NavLink>}
            </div>
        </header>
    );
};

export default Header;