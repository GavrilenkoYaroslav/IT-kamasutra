import React from 'react';
import Messages from "./Messages";
import {connect} from "react-redux";
import {sendMessageActionCreator} from "../../../redux/reducers/dialogs-reducer";

const mapStateToProps = (state) => {
  return {
      MessagesData : state.dialogsPage.MessagesData
  }
};

const mapDispatchToProps = {
  sendMessageActionCreator
};

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

export default MessagesContainer;