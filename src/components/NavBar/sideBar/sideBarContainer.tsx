import React from 'react';
import {connect} from "react-redux";
import SideBar from "./sideBar";
import {AppStateType} from "../../../redux/redux-store";
import {DialogType} from "../../../redux/reducers/dialogs-reducer";

type PropsType = MapStatePropsType;
type MapStatePropsType = {
    DialogsData: Array<DialogType>
}

const SideBarContainer: React.FC<PropsType> = (props) => {

    return (
        <SideBar someUsers={props.DialogsData}/>
    );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
   return {
       DialogsData : state.dialogsPage.DialogsData
   }
};

export default connect<MapStatePropsType,{},{},AppStateType>(mapStateToProps)(SideBarContainer);

