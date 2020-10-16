import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getMyProfile, getUserProfile, getUserStatus} from "../../redux/reducers/profile-reducer";
import {withRouter} from "react-router-dom";
// import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    async componentDidMount () {
        if (!this.props.match.params.userId) {
            await this.props.getMyProfile();
        } else {
        let userId = this.props.match.params.userId;
        await this.props.getUserProfile(userId);
        }
    }

    render() {
        return (
            <Profile profile={this.props.profile} status={this.props.status} isFetching={this.props.isFetching}/>
        );
    };
}


let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isFetching: state.profilePage.isFetching
    }
};

let mapDispatchToProps = {
    getUserProfile,
    getMyProfile,
    getUserStatus
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(ProfileContainer);