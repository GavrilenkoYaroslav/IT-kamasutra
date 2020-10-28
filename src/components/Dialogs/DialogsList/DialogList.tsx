import React from 'react';
import styles from './DialogList.module.css';
import DialogItem from "./DialogItem/DialogItem";
import {DialogType} from "../../../redux/reducers/dialogs-reducer";

type PropsType = {
    DialogsData: Array<DialogType>
}

const DialogList: React.FC<PropsType> = (props) => {

    let DialogsElements = props.DialogsData.map( dialog => <DialogItem key={dialog.id} id={dialog.id} name={dialog.name} logoSrc={dialog.logoSrc}/>);

    return (
        <div className={styles.dialogList}>
            {DialogsElements}
        </div>
    );
};

export default DialogList;