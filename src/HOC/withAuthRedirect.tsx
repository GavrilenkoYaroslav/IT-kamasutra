import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

const mapStateToPropsForRedirect = (state:AppStateType): PropsType => {
    return {
        id: state.auth.id
    }
};

type PropsType = {
    id: number | null
}

export const withAuthRedirect = (Component: React.FC) => {

    const withAuthRedirectContainer: React.FC<PropsType> = (props) => {
        if ( !props.id ) {
            return <Redirect to="/login"/>
        }else

        return <Component {...props}/>
    };

    return connect<PropsType,{},{},AppStateType>(mapStateToPropsForRedirect)(withAuthRedirectContainer);

};