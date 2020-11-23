import React, {useCallback, useEffect, useState} from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {
    follow, getUsers,
    unfollow, UserType
} from "../../redux/reducers/users-reducer";
import Wallpaper from "../Wallpaper/Wallpaper";
import Preloader from "../common/Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";
import {SearchUsers} from "./SearchUsers/SearchUsers";
import styles from './users.module.css'
import {Pagination} from "antd";
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";

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
    getUsers: (currentPage: number, pageSize: number, friend?: boolean, term?: string) => void
}

type QueryType = {
    term?: string
    page?: string
    pageSize?: string
    friend?: string
}

type PropsType = MapDispatchPropsType & MapStatePropsType;

const UsersContainer: React.FC<PropsType> = (props) => {

    const [term, setTerm] = useState('');
    const [defaultPageSize, setDefaultPageSize] = useState(16);
    const [currentPage, setCurrentPage] = useState(1);

    const history = useHistory();

    useEffect(()=> {
        const parsedQuery: QueryType = queryString.parse(history.location.search.substr(1));

        if (parsedQuery.term && parsedQuery.term.length) setTerm(parsedQuery.term);
        if (parsedQuery.page) setCurrentPage(Number(parsedQuery.page));
        if (parsedQuery.pageSize) setDefaultPageSize(Number(parsedQuery.pageSize));

    },[]);

    useEffect(() => {
        const querySearch: QueryType = {};
        if (!!term) querySearch.term = term;
        if (currentPage !== 1) querySearch.page = String(currentPage);
        if (defaultPageSize !== 16) querySearch.pageSize = String(defaultPageSize);

        history.push({
            pathname: '/users',
            search: queryString.stringify(querySearch)
        });

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
            <SearchUsers term={term} setTerm={setTermCallback} setCurrentPage={setCurrentPageCallback}/>

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
                            pageSize={defaultPageSize}
                            defaultCurrent={currentPage}
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
    getUsers
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,
    mapDispatchToProps)(UsersContainer);
