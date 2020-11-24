import {Button, Input} from "antd";
import React, {ChangeEvent, useEffect, useState} from "react";
import styles from './SearchUsers.module.css'
import useDebouncedCallback from "use-debounce/lib/useDebouncedCallback";
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';


type PropsType = {
    setTerm: (term: string) => void
    setCurrentPage: (page: number) => void
    term: string
    currentPage: number
    isFetching: boolean
}

export const SearchUsers: React.FC<PropsType> = (props) => {

    const [inputValue, setInputValue] = useState(props.term);

    useEffect(() => {
        setInputValue(props.term);
    }, [props.term]);

    const onSearch = () => {
        props.setCurrentPage(1);
        props.setTerm(inputValue);
    };

    const debounced = useDebouncedCallback(onSearch, 1000);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        debounced.callback();
    };

    const onSearchAll = () => {
        props.setTerm('');
        setInputValue('');
        props.setCurrentPage(1);
    };

    const disabled = props.currentPage === 1 && !inputValue;

    return (
        <>
            <div className={styles.searchInputContainer}>

                {props.isFetching && <div className={styles.spiner}>
                    <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
                </div>}

                <Input placeholder='search users here...' value={inputValue}
                       onChange={onInputChange}/>
                <Button type='primary' disabled={disabled} onClick={onSearchAll}>Clear filters</Button>
            </div>
        </>
    );
};