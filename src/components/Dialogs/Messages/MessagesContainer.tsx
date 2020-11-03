import React, {useCallback} from 'react';
import Messages from "./Messages";
import {useDispatch, useSelector} from "react-redux";
import {sendMessageActionCreator} from "../../../redux/reducers/dialogs-reducer";
import {AppStateType} from "../../../redux/redux-store";
import {reset} from "redux-form";

// type MapStatePropsType = {
//     MessagesData: Array<MessageType>
// }
// type MapDispatchPropsType = {
//     sendMessageActionCreator: (message:string)=>void
// }

// const mapStateToProps = (state: AppStateType): MapStatePropsType => {
//   return {
//       MessagesData : state.dialogsPage.MessagesData
//   }
// };
//
// const mapDispatchToProps: MapDispatchPropsType = {
//   sendMessageActionCreator
// };

// const MessagesContainer = connect<MapStatePropsType,MapDispatchPropsType,{},AppStateType>(mapStateToProps, mapDispatchToProps)(Messages);


const getMessagesData = (state: AppStateType) => {
    return state.dialogsPage.MessagesData
};

const MessagesContainer: React.FC = () => {

    const MessagesData = useSelector(getMessagesData);
    const dispatch = useDispatch();

    const sendMessage = useCallback((message) => dispatch(sendMessageActionCreator(message)), [dispatch]);
    const resetForm = useCallback(() => dispatch(reset('sendMessageForm')), [dispatch]);

    return (
        <Messages MessagesData={MessagesData}
                      sendMessage={sendMessage}
                      resetForm={resetForm}/>)
};

export default MessagesContainer;