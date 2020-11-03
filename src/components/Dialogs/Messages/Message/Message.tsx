import React from 'react';
import styles from "./Message.module.css";

type PropsType = {
    id: number
    message: string
}

const Message: React.FC<PropsType> = (props) => {
    return(
        <div className={styles.message}>
            {props.message}
        </div>
    );
};

export default Message;