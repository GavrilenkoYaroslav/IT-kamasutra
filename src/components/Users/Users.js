import React from 'react';
import User from "./User/User";
import styles from './users.module.css';

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++){
        pages.push(i);
    }

    let Users = props.users.map(user => (
        <User id={user.id} logoSrc={user.photos.small} name={user.name} followed={user.followed} follow={props.follow}
              unfollow={props.unfollow}/>));

    return (
        <div>
            <div>
                {Users}
            </div>
            <div>
                {pages.map( p => { return <span className={props.currentPage === p && styles.active} onClick={ () => props.onPageChange(p)}>{p}</span> })}
            </div>
        </div>
    );
};


export default Users;