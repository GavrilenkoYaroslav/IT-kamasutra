import React from 'react';
import Messages from "./Messages";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
      MessagesData : state.dialogsPage.MessagesData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

export default MessagesContainer;