import React from 'react';
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

const NotFound = () => {

    const theme = useSelector((state: AppStateType) => state.app.theme);

    return (
        <h1 style={theme ? {color: '#c9d1d9'} : {}}>404 NOT FOUND</h1>
    );
};

export default NotFound;