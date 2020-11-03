import React from 'react';
import styles from './Wallpaper.module.css';

const Wallpaper = () => {
    return(
        <div className={styles.box}>
            <img className={styles.img} src='https://wonderkids.club/wp-content/uploads/2019/09/casteism-india_peopleandthoughts.png' alt={''}/>
        </div>
    );
};

export default Wallpaper;