import React, {useEffect, useState} from 'react';
import styles from './sideBar.module.css';
import Friend from './friend/friend';
import {UserType} from "../../../redux/reducers/users-reducer";

type PropsType = {
    userFriends: Array<UserType>
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
                <div className={styles.title}>Friends:</div>
                <div className={styles.friendsList}>
                    {shuffled.slice(0,5).map(friend => <Friend key={Math.random()} id={friend.id} name={friend.name}
                                                         logoSrc={friend.photos.small}/>)}
                </div>
            </div>}
        </>
    );
};

export default SideBar;