import React from 'react';
import User from "./User/User";
import styles from './users.module.css';

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++){
        pages.push(i);
    }

    return (
        <div>
            <div className={styles.usersContainer}>
                {props.users.map(user => (
                    <User key={user.id} id={user.id} logoSrc={user.photos.small} name={user.name} followed={user.followed} follow={props.follow}
                          unfollow={props.unfollow} followingInProgress={props.followingInProgress}/>))}
            </div>
            <div className={styles.pages}>
                {pages.map( p => { return <span key={p} className={styles.paginator +' ' + (props.currentPage === p && styles.active)} onClick={ () => props.onPageChange(p)}>{p}</span> })}
            </div>
        </div>
    );
};


export default Users;