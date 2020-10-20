import React, {useEffect, useState} from 'react';
import {ProfileAPI} from "../../../API/API";

const Status = (props) => {

    const [status, setStatus] = useState(props.status);
    const [editMode, setEditMode] = useState(false);

    useEffect(()=>{
        setStatus(props.status);
    }, [props.status]);

    const enterToEditMode = () => {
        setEditMode(true);
    };

    const closeEditMode = () => {
        setEditMode(false);
        ProfileAPI.setStatus(status);
    };

    const statusChange = (e) => {
        setStatus(e.target.value);
    };


    return (
        <>
            {editMode ?
                <input autoFocus={ true } onBlur={ closeEditMode } onChange={ statusChange } value={ status }/> :
                <span onDoubleClick={ enterToEditMode }> {status ? status : 'Here can be your status (double click)'} </span>}
        </>
    );
};

export default Status;