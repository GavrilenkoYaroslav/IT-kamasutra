import React from 'react';
import Wallpaper from "../Wallpaper/Wallpaper";
import User from "./User/User";
import * as axios from 'axios'

const Users = (props) => {

    if ( props.users.length === 0 ) {

        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            props.setUsers(response.data.items);
        });
    }

     let Users = props.users.map( user => (<User id={user.id} logoSrc={user.photos.small} name={user.name} followed={user.followed} follow={props.follow} unfollow={props.unfollow}/>));

    return (
        <div>
            <Wallpaper/>
            <div>
                {Users}
            </div>
        </div>
    );

};

export default Users;