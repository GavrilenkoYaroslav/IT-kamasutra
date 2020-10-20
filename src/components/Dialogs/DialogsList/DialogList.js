import React from 'react';
import styles from './DialogList.module.css';
import DialogItem from "./DialogItem/DialogItem";

const DialogList = (props) => {

    let DialogsElements = props.DialogsData.map( dialog => <DialogItem Id={dialog.id} name={dialog.name} logoSrc={dialog.logoSrc}/>)

    return (
        <div className={styles.dialogList}>
            {DialogsElements}
        </div>
    );
};

export default DialogList;