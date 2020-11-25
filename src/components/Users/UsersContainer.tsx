import React, {useCallback, useEffect, useState} from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {
    follow, getUsers,
    unfollow, UserType
} from "../../redux/reducers/users-reducer";
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
    page?: string | number
    pageSize?: string | number
    friend?: string
}

export type SearchOptionsType = {
    term: string
    pageSize: number
    page: number
}

type PropsType = MapDispatchPropsType & MapStatePropsType;

const UsersContainer: React.FC<PropsType> = (props) => {

    const [searchOptions, setSearchOptions] = useState({term:'', pageSize: 16, page: 1});
    const history = useHistory();

    useEffect(()=> {
        const parsedQuery: QueryType = queryString.parse(history.location.search.substr(1));

        if (parsedQuery.page) parsedQuery.page = +parsedQuery.page;
        if (parsedQuery.pageSize) parsedQuery.pageSize = +parsedQuery.pageSize;

        setSearchOptions({...searchOptions, ...parsedQuery as SearchOptionsType});

    },[]);

    useEffect(() => {
        const querySearch: QueryType = {};
        if (!!searchOptions.term) {querySearch.term = searchOptions.term}
        if (searchOptions.page !== 1) querySearch.page = String(searchOptions.page);
        if (searchOptions.pageSize !== 16) querySearch.pageSize = String(searchOptions.pageSize);

        history.push({
            pathname: '/users',
            search: queryString.stringify(querySearch)
        });

        props.getUsers(searchOptions.page,searchOptions.pageSize, false, searchOptions.term);
    }, [searchOptions]);

    const onPageChange = (page: number, pageSize?: number) => {
        page !== 0 && pageSize &&
        setSearchOptions({...searchOptions, page: page, pageSize: pageSize});
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const onSizeChange = (currentPage: number, size: number) => {
        setSearchOptions({...searchOptions, pageSize: size});
    };

    const setSearchOptionsCallback = useCallback((value) => setSearchOptions(value), [setSearchOptions]);

    return (
        <>
            <SearchUsers isFetching={props.isFetching} searchOptions={searchOptions} setSearchOptions={setSearchOptionsCallback}/>

            <Users users={props.users}
                   follow={props.follow}
                   unfollow={props.unfollow}
                   followingInProgress={props.followingInProgress}
                   currentAuthUserId={props.currentAuthUserId}/>

            <div className={styles.paginator}>
                <Pagination size="small" total={props.totalUsersCount}
                            current={searchOptions.page}
                            onChange={onPageChange} pageSizeOptions={['16', '32', '64']}
                            pageSize={searchOptions.pageSize}
                            defaultCurrent={searchOptions.page}
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