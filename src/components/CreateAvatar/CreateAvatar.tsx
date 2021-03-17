import * as React from 'react';
import AvatarGenerator from "../common/AvatarGenerator/AvatarGenerator";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";


const CreateAvatar = () => {

    const id = useSelector((state: AppStateType) => state.auth.id);

    return (
        <>
           <AvatarGenerator id={id}/>
        </>
    );
};

export default CreateAvatar;