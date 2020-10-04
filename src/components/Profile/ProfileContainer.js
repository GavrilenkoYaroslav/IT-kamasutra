import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getMyProfile, getUserProfile} from "../../redux/reducers/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";


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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

// let authRedirectProfile = withAuthRedirect(ProfileContainer);
//
// let WithUrlProfileContainer = withRouter(authRedirectProfile);
//
// export default connect(mapStateToProps, mapDispatchToProps)(WithUrlProfileContainer);