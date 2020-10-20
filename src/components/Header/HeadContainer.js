import React from 'react';
import Header from "./Head";
import {connect} from "react-redux";
import {logout} from "../../redux/reducers/auth-reducer";
import {setUserProfile} from "../../redux/reducers/profile-reducer";



const HeaderContainer = (props) => {
        return (
            <Header {...props}/>
        );
    };

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