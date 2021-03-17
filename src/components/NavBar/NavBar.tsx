import React from 'react';
import styles from './NavBar.module.css';
import {NavLink} from "react-router-dom";
import SideBarContainer from "./sideBar/sideBarContainer";
import {Card} from "antd";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

const NavBar = () => {

    const theme = useSelector((state:AppStateType) => state.app.theme);

    return (
        <nav className={styles.NavBar}>
            <Card hoverable bordered={Boolean(theme)} className={ `${styles.bordered} ${theme ? 'dark darkA' : ''}`}>

            <div className={styles.Item}>
                <NavLink activeClassName={styles.active} to='/profile'>Profile</NavLink>
            </div>
            <div className={styles.Item}>
                <NavLink activeClassName={styles.active} to='/dialogs'>Messages</NavLink>
            </div>
            <div className={styles.Item}>
                <NavLink activeClassName={styles.active} to='/news'>News</NavLink>
            </div>
            <div className={styles.Item}>
                <NavLink activeClassName={styles.active} to='/music'>Music</NavLink>
            </div>
            <div className={styles.Item}>
                <NavLink activeClassName={styles.active} to='/avatar'>Avatar</NavLink>
            </div>
            <div className={styles.Item}>
                <NavLink activeClassName={styles.active} to='/users'>Users</NavLink>
            </div>

            <SideBarContainer/>

            </Card>
        </nav>
    );
};

export default NavBar;