import React from 'react';
import DialogList from "./DialogList";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
   return {
       DialogsData : state.dialogsPage.DialogsData
   }
};
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//
//   }
// };

const DialogListContainer = connect(mapStateToProps)(DialogList);


export default DialogListContainer;