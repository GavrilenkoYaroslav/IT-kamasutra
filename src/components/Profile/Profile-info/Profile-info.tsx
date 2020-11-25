import React, {ChangeEvent, useState} from 'react';
import styles from './Profile-Info.module.css';
import Status from "./Status";
import userLogo from '../../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg'
import DescriptionForm, {DescriptionFormDataType} from "./DescriptionForm";
import Description from "./Description";
import {ProfileType} from "../../../redux/reducers/auth-reducer";
import {Button, Card, Col, Row} from "antd";

type PropsType = {
    savePhoto: (file: any) => void
    saveProfile: (profile: DescriptionFormDataType) => void
    profile: ProfileType
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


    return (
        <Row justify='center'>
            <Col span={6}>
            <div className={styles.Avatar}>
                <img src={props.profile.photos.large || userLogo} alt={''}/>
                {props.isMyProfile && <input onChange={upploadPhoto}
                                             type={'file'}/>}
                <div className={styles.status}>
                    <Status status={props.status}/>
                </div>
            </div>
            </Col>

            <Col span={16}>
            <Card hoverable>
                {props.isMyProfile && !editMode &&
                <Button className={styles.editButton} onClick={enterEditMode}>Edit</Button>}
                {editMode ? <DescriptionForm onSubmit={onSubmit} initialValues={props.profile}/> :
                    <Description profile={props.profile}/>}
            </Card>
            </Col>
        </Row>
    );
};

export default ProfileInfo;