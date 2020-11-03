import preloader from "../../../Images/91.svg";
import React from "react";

type PropsType = {
    className?: string
}

const Preloader: React.FC<PropsType> = (props) => {
    return (
        <div><img src={preloader} alt={'Loading...'} className={props.className ? props.className : ''}/></div>
    );
};

export default Preloader;