import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => {
    return {
        auth: state.auth.auth
    }
};

export const withAuthRedirect = (Component) => {

    const withAuthRedirectContainer = (props) => {
        if ( !props.auth ) {
            return <Redirect to="/login"/>
        }else

        return <Component {...props}/>
    };

    let connectedWithAuthRedirectContainer = connect(mapStateToPropsForRedirect)(withAuthRedirectContainer);

    return connectedWithAuthRedirectContainer;

};