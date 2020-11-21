import {Button, Input} from 'antd';
import React from 'react';
import {useState} from 'react';
import {UserType} from '../../redux/reducers/users-reducer';
import User from "./User/User";
import styles from './users.module.css';


type PropsType = {
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: Array<number>
    currentPage: number
    onPageChange: (page: number) => void
    currentAuthUserId: null | number
    getUsers: (currentPage: number, pageSize: number, friend?: boolean, term?: string) => void
    setTerm: (term: string) => void
    setCurrentPage: (page: number) => void
}

const Users: React.FC<PropsType> = (props) => {

    const [inputValue, setInputValue] = useState('');

    const onSearch = () => {
        props.setTerm(inputValue);
        setInputValue('');
        props.setCurrentPage(1);
    };


    const onSearchAll = () => {
        props.setTerm('');
        props.setCurrentPage(1);
    };

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages: Array<number> = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div className={styles.searchInputContainer}>
                <Input placeholder='search users here...' onChange={(e) => setInputValue(e.target.value)}/>
            </div>
            <div className={styles.searchButtons}>
                <Button type='primary' onClick={onSearch}>Search</Button> <Button type='primary' onClick={onSearchAll}>Show All</Button>
            </div>

            <div className={styles.usersContainer}>
                {props.users.map(user => (
                    <User key={user.id} id={user.id}
                          logoSrc={user.photos.small}
                          name={user.name}
                          followed={user.followed}
                          follow={props.follow}
                          unfollow={props.unfollow}
                          followingInProgress={props.followingInProgress}
                          currentAuthUserId={props.currentAuthUserId}/>))}
            </div>
            <div className={styles.pages}>
                {pages.map(p => {
                    return <span key={p} className={styles.paginator + ' ' + (props.currentPage === p && styles.active)}
                                 onClick={() => props.onPageChange(p)}>{p}</span>
                })}
            </div>
        </div>
    );
};


export default Users;