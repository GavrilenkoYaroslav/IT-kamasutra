import React from 'react';
import {connect} from "react-redux";
import SideBar from "./sideBar";

const SideBarContainer = (props) => {

    return (
        <SideBar someUsers={props.someUsers}/>
    );
};

const mapStateToProps = (state) => {
   return {
       someUsers : state.dialogsPage.DialogsData
   }
};

export default connect(mapStateToProps)(SideBarContainer);

