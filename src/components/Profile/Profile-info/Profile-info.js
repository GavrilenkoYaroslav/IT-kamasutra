import React, {useState} from 'react';
import styles from './Profile-Info.module.css';
import Status from "./Status";
import userLogo from '../../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg'
import DescriptionForm from "./DescriptionForm";
import Description from "./Description";


const ProfileInfo = (props) => {

    const [editMode, setEditMode] = useState(false);

    const enterEditMode = () => {
        setEditMode(true);
    };

    const upploadPhoto = (e) => {
        e.target.files.length &&
        props.savePhoto(e.target.files[0]);
        e.target.value = '';

    };

    const onSubmit = (data) => {
        props.saveProfile(data);
    };

    if (!props.profile) {
        return <div>Please Log in</div>
    }


    return (
        <div className={styles.user}>
            <div className={styles.Avatar}>
                <img src={props.profile.photos.large || userLogo}/>
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