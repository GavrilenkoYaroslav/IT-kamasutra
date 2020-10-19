import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => {
    return {
        id: state.auth.id
    }
};

export const withAuthRedirect = (Component) => {

    const withAuthRedirectContainer = (props) => {
        if ( !props.id ) {
            return <Redirect to="/login"/>
        }else

        return <Component {...props}/>
    };

    let connectedWithAuthRedirectContainer = connect(mapStateToPropsForRedirect)(withAuthRedirectContainer);

    return connectedWithAuthRedirectContainer;

};