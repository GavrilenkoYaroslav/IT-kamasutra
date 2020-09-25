import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import * as axios from "axios";
import {setUserProfile} from "../../redux/reducers/profile-reducer";
import {withRouter} from "react-router-dom";

class ProfileContainer extends React.Component {

    componentDidMount() {
        if (!this.props.match.params.userId) {
            axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
                withCredentials: true
            })
                .then(response => {
                    if (response.data.resultCode === 0) {
                        let userId = response.data.data.id;
                        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
                            .then(response => {
                                this.props.setUserProfile(response.data);
                            });
                    }
                });
        }

        let userId = this.props.match.params.userId;
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
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
    setUserProfile
};

let WithUrlProfileContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(WithUrlProfileContainer);