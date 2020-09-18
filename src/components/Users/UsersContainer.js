import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {followActionCreator, setUsers, unFollowActionCreator} from "../../redux/reducers/users-reducer";


const mapStateToProps = (state)=> {
    return {
        users: state.usersPage.users
    }

};

const mapDispatchToProps = (dispatch)=>{
    return {
        follow: (userId)=>{dispatch(followActionCreator(userId))},
        unfollow: (userId)=>{dispatch(unFollowActionCreator(userId))},
        setUsers: (users) => {dispatch(setUsers(users))}
    }
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);


export default UsersContainer;