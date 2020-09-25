import preloader from "../../../Images/91.svg";
import React from "react";

const Preloader = (props) => {
    return (
        <div><img src={preloader} className={props.className ? props.className : ''}/></div>
    );
};

export default Preloader;