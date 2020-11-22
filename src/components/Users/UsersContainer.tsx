import React, {useCallback, useEffect, useState} from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {
    follow, getUsers,
    setTotalUsersCount,
    unfollow, UserType
} from "../../redux/reducers/users-reducer";
import Wallpaper from "../Wallpaper/Wallpaper";
import Preloader from "../common/Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    isFetching: boolean
    currentAuthUserId: null | number
}

type MapDispatchPropsType = {
    follow: (user: UserType) => void
    unfollow: (user: UserType) => void
    setTotalUsersCount: (usersCount: number) => void
    getUsers: (currentPage: number, pageSize: number,friend?:boolean, term?:string) => void
}

type PropsType = MapDispatchPropsType & MapStatePropsType;

const UsersContainer: React.FC<PropsType> = (props) => {

    const [term, setTerm] = useState('');
    const [pageSize , setPageSize] = useState(16);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        props.getUsers(currentPage, pageSize, false, term);
    }, [currentPage, term]);

    const onPageChange = async (p: number) => {
        await setCurrentPage(p);
        props.getUsers(p, pageSize, false, term);
    };

    const setTermCallback = useCallback((value)=> setTerm(value), [setTerm]);
    const setCurrentPageCallback = useCallback((value)=> setCurrentPage(value),[setCurrentPage]);

    return (
        <>
            <Wallpaper/>
            {props.isFetching ? <Preloader/> :
                <Users totalUsersCount={props.totalUsersCount}
                       pageSize={pageSize}
                       users={props.users}
                       follow={props.follow}
                       unfollow={props.unfollow}
                       currentPage={currentPage}
                       onPageChange={onPageChange}
                       followingInProgress={props.followingInProgress}
                       currentAuthUserId={props.currentAuthUserId}
                       setTerm={setTermCallback}
                       setCurrentPage={setCurrentPageCallback}/>}
        </>
    );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        currentAuthUserId: state.auth.id
    }

};

const mapDispatchToProps: MapDispatchPropsType = {
    follow,
    unfollow,
    setTotalUsersCount,
    getUsers
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(UsersContainer);
