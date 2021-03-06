import React, {useState} from 'react';
import styles from './Profile-Info.module.css';
import Status from "./Status";
import userLogo from '../../../Images/scalable-vector-graphics-avatar-learning-icon-customer-login-avatar.jpg'
import DescriptionForm, {DescriptionFormDataType} from "./DescriptionForm";
import Description from "./Description";
import {ProfileType} from "../../../redux/reducers/auth-reducer";
import {Button, Card, Col, Row, Upload} from "antd";
import {UploadOutlined} from '@ant-design/icons';

type PropsType = {
    savePhoto: (file: any) => void
    saveProfile: (profile: DescriptionFormDataType) => void
    profile: ProfileType
    isMyProfile: boolean
    status: string
    theme: 'Dark' | null
}

const ProfileInfo: React.FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState(false);

    const enterEditMode = () => {
        setEditMode(true);
    };

    const uploadPhoto = (file: File) => {
        props.savePhoto(file);
        return false;
    };

    const onSubmit = (data: DescriptionFormDataType) => {
        props.saveProfile(data);
    };


    return (
        <Row justify='center'>
            <Col span={6}>
                <div className={styles.Avatar}>
                    <img src={props.profile.photos.large || userLogo} alt={''}/>

                    {props.isMyProfile &&
                    <div style={{width:'200px', textAlign: 'center'}} >
                        <Upload showUploadList={false} beforeUpload={ uploadPhoto }>
                            <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                        </Upload>
                    </div>}

                    <div className={styles.status}>
                        <Status status={props.status} theme={props.theme}/>
                    </div>
                </div>
            </Col>

            <Col span={16}>
                <Card hoverable className={props.theme ? `${styles.bordered} dark` : ''}>
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