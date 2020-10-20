import React, {useEffect} from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {
    follow, getUsers, pageChange,
    setTotalUsersCount, toggleFetching,
    unfollow
} from "../../redux/reducers/users-reducer";
import Wallpaper from "../Wallpaper/Wallpaper";
import Preloader from "../common/Preloader/Preloader";


const UsersContainer = (props) => {

    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize);
    }, [props.currentPage]);

    const onPageChange = (p) => {
        props.pageChange(p, props.pageSize);
    };

    return (
        <>
            <Wallpaper/>
            {props.isFetching ? <Preloader/> :
                <Users totalUsersCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       users={props.users}
                       follow={props.follow}
                       unfollow={props.unfollow}
                       currentPage={props.currentPage}
                       onPageChange={onPageChange}
                       followingInProgress={props.followingInProgress}
                />}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }

};

const mapDispatchToProps = {
    follow,
    unfollow,
    setTotalUsersCount,
    toggleFetching,
    getUsers, pageChange
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
