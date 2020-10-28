import React from 'react';
import DialogList from "./DialogList";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {DialogType} from "../../../redux/reducers/dialogs-reducer";

type MapStatePropsType = {
    DialogsData: Array<DialogType>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
   return {
       DialogsData : state.dialogsPage.DialogsData
   }
};

const DialogListContainer = connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps)(DialogList);


export default DialogListContainer;