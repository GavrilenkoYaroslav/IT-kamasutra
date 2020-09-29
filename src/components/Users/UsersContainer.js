import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {
    follow, getUsers, pageChange,
    setTotalUsersCount, toggleFetching,
    unfollow
} from "../../redux/reducers/users-reducer";
import Wallpaper from "../Wallpaper/Wallpaper";
import Preloader from "../common/Preloader/Preloader";




class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
        // this.props.toggleFetching(true);
        // UsersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //         this.props.toggleFetching(false);
        //         this.props.setUsers(data.items);
        //         this.props.setTotalUsersCount(data.totalCount);
        //     });
    }

    onPageChange = (p) => {
        // this.props.toggleFetching(true);
        // this.props.changePage(p);
        // UsersAPI.getUsers(p, this.props.pageSize)
        //     .then( data => {
        //         this.props.toggleFetching(false);
        //         this.props.setUsers(data.items);
        //     });
        this.props.pageChange(p, this.props.pageSize);
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
                   onPageChange={this.onPageChange}
                   followingInProgress={this.props.followingInProgress}
            />}
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
        isFetching: state.usersPage.isFetching,
        followingInProgress : state.usersPage.followingInProgress
    }

};

const mapDispatchToProps = {
        follow,
        unfollow,
        setTotalUsersCount,
        toggleFetching,
        getUsers, pageChange
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
