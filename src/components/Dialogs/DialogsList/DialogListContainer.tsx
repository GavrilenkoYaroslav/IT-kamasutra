import React from 'react';
import DialogList from "./DialogList";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {DialogType} from "../../../redux/reducers/dialogs-reducer";

const DialogListContainer = () => {

    const DialogsData: Array<DialogType> = useSelector((state: AppStateType) => state.dialogsPage.DialogsData);

  return (
        <DialogList DialogsData={DialogsData}/>
  );
};

export default DialogListContainer;