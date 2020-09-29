import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getMyProfile, getUserProfile} from "../../redux/reducers/profile-reducer";
import {withRouter} from "react-router-dom";


class ProfileContainer extends React.Component {

    componentDidMount() {
        if (!this.props.match.params.userId) {
            // AuthAPI.AuthMe()
            //     .then(data => {
            //         if (data.resultCode === 0) {
            //             let userId = data.data.id;
            //             this.props.getUserProfile(userId);
            //         }
            //     });
            this.props.getMyProfile();
        } else {
        let userId = this.props.match.params.userId;
        this.props.getUserProfile(userId);
        }
    }

    render() {
        return (
            <Profile {...this.props} />
        );
    };
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile
    }
};

let mapDispatchToProps = {
    getUserProfile,
    getMyProfile
};

let WithUrlProfileContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(WithUrlProfileContainer);