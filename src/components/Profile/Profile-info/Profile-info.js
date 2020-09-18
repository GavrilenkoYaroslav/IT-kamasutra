import React from 'react';
import styles from './Profile-Info.module.css';

const ProfileInfo = (props) => {
    return(
        <div className={styles.user}>
            <div className={styles.Avatar}>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqc0qwLkD2-SHZlWMr7z7lRvzHQfxaXk_TLw&usqp=CAU'/>
            </div>
            <div className={styles.description}> description</div>
        </div>
    );
};

export default ProfileInfo;