import React from 'react';
import Header from "./Head";
import {connect} from "react-redux";
import {logout} from "../../redux/reducers/auth-reducer";
import {setUserProfile} from "../../redux/reducers/profile-reducer";



class HeaderContainer extends React.Component {

    // componentDidMount() {
    //     this.props.authMe();


        // this.props.toggleFetching(true);
        // AuthAPI.AuthMe()
        //     .then(data => {
        //         this.props.toggleFetching(false);
        //         if (data.resultCode === 0) {
        //             let {id, login, email} = data.data;
        //             this.props.setUserAuthData(id, login, email);
        //
        //             UsersAPI.getSingleUser(id)
        //                 .then(data => {
        //                     this.props.setLogoSrc(data.photos.small);
        //                 });
        //         }
        //     });

    // }

    render() {
        return (
            <Header {...this.props}/>
        );
    };
}

let mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

let mapDispatchToProps = {
    logout,
    setUserProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);