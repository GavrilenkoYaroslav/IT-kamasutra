import React, {ChangeEvent, useEffect, useState} from 'react';
import {ProfileAPI} from "../../../API/ProfileAPI";
import {Card} from "antd";

type PropsType = {
    status: string
}

const Status: React.FC<PropsType> = (props) => {

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

    const statusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value);
    };


    return (
        <Card bodyStyle={{padding: '3px'}} hoverable>
            {editMode ?
                <input autoFocus={ true } onBlur={ closeEditMode } onChange={ statusChange } value={ status }/> :
                <span onDoubleClick={ enterToEditMode }> {status ? status : 'Here can be your status (double click)'} </span>}
        </Card>
    );
};

export default Status;