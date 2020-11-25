import React from 'react';
import styles from './NavBar.module.css';
import {NavLink} from "react-router-dom";
import SideBarContainer from "./sideBar/sideBarContainer";
import {Card} from "antd";

const NavBar = () => {
    return (
        <nav className={styles.NavBar}>
            <Card hoverable bordered={false}>

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
                <NavLink activeClassName={styles.active} to='/settings'>Settings</NavLink>
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