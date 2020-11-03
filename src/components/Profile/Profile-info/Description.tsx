import styles from "./Profile-Info.module.css";
import React from "react";
import {ProfileType} from "../../../redux/reducers/auth-reducer";

type PropsType = {
    profile: ProfileType
}

const Description: React.FC<PropsType> = (props) => {
    return (
        <div>
            <div>
                <h2>{props.profile.fullName}</h2>
            </div>
            <div className={styles.about}>
                <div>
                    <b>Looking for a job:</b> {props.profile.lookingForAJob ? 'yes' : 'no'}
                </div>
                <div>
                    <b>My skills:</b> {props.profile.lookingForAJobDescription}
                </div>
                <div>
                    <b>About me:</b> {props.profile.aboutMe}
                </div>
            </div>
            <div>
                <b>Contacts:</b>
            </div>
            <div className={styles.contacts}>
                {Object.keys(props.profile.contacts).map(key => <Contacts title={key}
                                                                          value={props.profile.contacts[key]}
                                                                          key={key}/>)}
            </div>
        </div>
    );
};


type ContactsPropsType = {
    title: string
    value: string
}

const Contacts: React.FC<ContactsPropsType> = (props) => {
    return (
        <div><b>{props.title}</b> : {props.value}</div>
    );
};

export default Description;