import React, {ChangeEvent, useState} from 'react';
import styles from './Profile-Info.module.css';
import Status from "./Status";
import userLogo from '../../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg'
import DescriptionForm, {DescriptionFormDataType} from "./DescriptionForm";
import Description from "./Description";
import {ProfileType} from "../../../redux/reducers/auth-reducer";

type PropsType = {
    savePhoto: (file: any) => void
    saveProfile: (profile: DescriptionFormDataType) => void
    profile: ProfileType | null
    isMyProfile: boolean
    status: string
}

const ProfileInfo: React.FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState(false);

    const enterEditMode = () => {
        setEditMode(true);
    };

    const upploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.files!.length &&
        props.savePhoto(e.target.files![0]);
        e.target.value = '';

    };

    const onSubmit = (data: DescriptionFormDataType) => {
        props.saveProfile(data);
    };

    if (!props.profile) {
        return <div>Please Log in</div>
    }


    return (
        <div className={styles.user}>
            <div className={styles.Avatar}>
                <img src={props.profile.photos.large || userLogo} alt={''}/>
                {props.isMyProfile && <input onChange={upploadPhoto}
                                             type={'file'}/>}
                <div className={styles.status}>
                    <Status status={props.status}/>
                </div>
            </div>

            <div className={styles.description}>
                {props.isMyProfile && !editMode &&
                <button className={styles.editButton} onClick={enterEditMode}>Edit</button>}
                {editMode ? <DescriptionForm onSubmit={onSubmit} initialValues={props.profile}/> :
                    <Description profile={props.profile}/>}
            </div>
        </div>
    );
};

export default ProfileInfo;