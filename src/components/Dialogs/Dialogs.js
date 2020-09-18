import React from 'react';
import styles from './Dialogs.module.css';
import Wallpaper from "../Wallpaper/Wallpaper";
import DialogListContainer from "./DialogsList/DialogListContainer";
import MessagesContainer from "./Messages/MessagesContainer";

const Dialogs = () => {
    return (
        <div>
            <Wallpaper/>
            <div className={styles.dialogs}>
                <DialogListContainer/>
                <MessagesContainer/>
            </div>
        </div>
    );
};

export default Dialogs;