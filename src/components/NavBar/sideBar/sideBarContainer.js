import React from 'react';
import {connect} from "react-redux";
import SideBar from "./sideBar";


const mapStateToProps = (state) => {
   return {
       DialogsData : state.dialogsPage.DialogsData
   }
};

const SideBarContainer = connect(mapStateToProps)(SideBar);

export default SideBarContainer;