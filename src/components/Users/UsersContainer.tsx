import React, {useEffect} from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {
    follow, getUsers, pageChange,
    setTotalUsersCount,
    unfollow, UserType
} from "../../redux/reducers/users-reducer";
import Wallpaper from "../Wallpaper/Wallpaper";
import Preloader from "../common/Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    currentPage: number
    isFetching: boolean
    currentAuthUserId: null | number
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setTotalUsersCount: (usersCount: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    pageChange: (page: number, pageSize: number) => void
}

type PropsType = MapDispatchPropsType & MapStatePropsType;

const UsersContainer: React.FC<PropsType> = (props) => {

    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize);
    }, [props.currentPage]);

    const onPageChange = (p: number) => {
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
                       currentAuthUserId={props.currentAuthUserId}/>}
        </>
    );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        currentAuthUserId: state.auth.id
    }

};

const mapDispatchToProps: MapDispatchPropsType = {
    follow,
    unfollow,
    setTotalUsersCount,
    getUsers,
    pageChange
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(UsersContainer);
