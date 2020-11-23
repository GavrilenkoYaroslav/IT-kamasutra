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
import {SearchUsers} from "./SearchUsers/SearchUsers";
import styles from './users.module.css'
import {Pagination} from "antd";

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
    getUsers: (currentPage: number, pageSize: number, friend?: boolean, term?: string) => void
}

type PropsType = MapDispatchPropsType & MapStatePropsType;

const UsersContainer: React.FC<PropsType> = (props) => {

    const [term, setTerm] = useState('');
    const [defaultPageSize, setDefaultPageSize] = useState(16);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        props.getUsers(currentPage, defaultPageSize, false, term);
    }, [currentPage, defaultPageSize, term]);

    const onPageChange = (page: number, pageSize?: number) => {
        page !== 0 && setCurrentPage(page);
        pageSize && setDefaultPageSize(pageSize);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const onSizeChange = (currentSize: number, size: number) => {
        setDefaultPageSize(size);
    };

    const setTermCallback = useCallback((value) => setTerm(value), [setTerm]);
    const setCurrentPageCallback = useCallback((value) => setCurrentPage(value), [setCurrentPage]);

    return (
        <>
            <Wallpaper/>
            <SearchUsers setTerm={setTermCallback} setCurrentPage={setCurrentPageCallback}/>

            {props.isFetching && <Preloader/>}

            <Users users={props.users}
                   follow={props.follow}
                   unfollow={props.unfollow}
                   followingInProgress={props.followingInProgress}
                   currentAuthUserId={props.currentAuthUserId}/>
            <div className={styles.paginator}>
                <Pagination size="small" total={props.totalUsersCount}
                            current={currentPage}
                            onChange={onPageChange} pageSizeOptions={['16', '32', '64']}
                            defaultPageSize={16} defaultCurrent={currentPage}
                            onShowSizeChange={onSizeChange}
                            hideOnSinglePage showSizeChanger showQuickJumper/>
            </div>
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

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,
    mapDispatchToProps)(UsersContainer);
