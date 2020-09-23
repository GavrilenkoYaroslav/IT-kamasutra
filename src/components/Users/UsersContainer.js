import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {
    changePage,
    follow,
    setTotalUsersCount,
    setUsers, toggleFetching,
    unfollow
} from "../../redux/reducers/users-reducer";
import * as axios from "axios";
import Wallpaper from "../Wallpaper/Wallpaper";
import Preloader from "../common/Preloader/Preloader";


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.toggleFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleFetching(false);
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChange = (p) => {
        this.props.toggleFetching(true);
        this.props.changePage(p);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleFetching(false);
                this.props.setUsers(response.data.items);
            });
    };

    render() {

        return (
            <>
                <Wallpaper/>
            {this.props.isFetching ? <Preloader/> :
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   currentPage={this.props.currentPage}
                   onPageChange={this.onPageChange}/>}
                   </>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }

};

const mapDispatchToProps = {
        follow,
        unfollow,
        setUsers,
        changePage,
        setTotalUsersCount,
        toggleFetching
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
