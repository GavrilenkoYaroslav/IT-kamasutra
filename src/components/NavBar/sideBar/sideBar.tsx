import React, {useEffect, useState} from 'react';
import styles from './sideBar.module.css';
import Friend from './friend/friend';
import {UserType} from "../../../redux/reducers/users-reducer";
import {Card} from "antd";

type PropsType = {
    userFriends: Array<UserType>
    theme: 'Dark' | null
}

const SideBar: React.FC<PropsType> = (props) => {

    const [shuffled, setShuffled] = useState(props.userFriends);

    useEffect(()=>{

        setShuffled(props.userFriends);

        const interval = setInterval(()=> {
            setShuffled([...props.userFriends].sort(() => 0.5 - Math.random()));
        }, 20000);

        return () => clearInterval(interval)

    },[props.userFriends]);




    return (<>
            {!!shuffled.length &&
            <div className={styles.sideBar}>
                <Card bordered={!!props.theme} className={props.theme ? `dark ${styles.bordered}` : ''}>
                <div className={styles.title}>Friends:</div>
                <div className={styles.friendsList}>
                    {shuffled.slice(0,5).map(friend => <Friend theme={props.theme} key={Math.random()} id={friend.id} name={friend.name}
                                                         logoSrc={friend.photos.small}/>)}
                </div>
                </Card>
            </div>}
        </>
    );
};

export default SideBar;