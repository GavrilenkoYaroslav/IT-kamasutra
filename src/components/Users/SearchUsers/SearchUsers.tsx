import {Button, Input} from "antd";
import React, {useState} from "react";
import styles from './SearchUsers.module.css'

type PropsType = {
    setTerm: (term: string) => void
    setCurrentPage: (page: number) => void
}

export const SearchUsers: React.FC<PropsType> = (props) => {

    const [inputValue, setInputValue] = useState('');

    const onSearch = () => {
        props.setTerm(inputValue);
        props.setCurrentPage(1);
    };


    const onSearchAll = () => {
        props.setTerm('');
        setInputValue('');
        props.setCurrentPage(1);
    };

    return (
        <>
            <div className={styles.searchInputContainer}>
                <Input placeholder='search users here...' value={inputValue}
                       onChange={(e) => setInputValue(e.target.value)}/>
            </div>
            <div className={styles.searchButtons}>
                <Button type='primary' onClick={onSearch}>Search</Button> <Button type='primary' onClick={onSearchAll}>Show
                All</Button>
            </div>
        </>
    );
};