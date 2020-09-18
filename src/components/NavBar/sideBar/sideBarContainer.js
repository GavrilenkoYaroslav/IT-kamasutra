import React from 'react';
import {connect} from "react-redux";
import SideBar from "./sideBar";

// const SideBar = (props) => {
//     let friendsElements = props.state.dialogsPage.DialogsData.map( friend => <Friend name={friend.name} logoSrc={friend.logoSrc}/> );
//
//     return(
//         <div className={styles.sideBar}>
//             <div className={styles.title}>Friends:</div>
//             <div className={styles.friendsList}>
//             {friendsElements}
//             </div>
//         </div>
//     );
// };

const mapStateToProps = (state) => {
   return {
       DialogsData : state.dialogsPage.DialogsData
   }
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//
//     }
// };

const SideBarContainer = connect(mapStateToProps)(SideBar);

export default SideBarContainer;