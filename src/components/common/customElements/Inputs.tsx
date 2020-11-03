import React from 'react';
import styles from './Inputs.module.css';
import {WrappedFieldProps} from "redux-form";

export const Textarea: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;

    return (
        <div className={styles.formControl + ' ' + (hasError? styles.error : '')}>
            <div>
                <textarea {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};

export const Input: React.FC<WrappedFieldProps>  = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;

    return (
        <div className={styles.formControl + ' ' + (hasError? styles.error : '')}>
            <div>
                <input {...input} {...props}/>
            </div>
            {hasError &&<span>{meta.error}</span>}
        </div>
    );
};
