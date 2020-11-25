import {Button, Input} from "antd";
import React, {ChangeEvent, useEffect, useState} from "react";
import styles from './SearchUsers.module.css'
import useDebouncedCallback from "use-debounce/lib/useDebouncedCallback";
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {SearchOptionsType} from "../UsersContainer";

type PropsType = {
    setSearchOptions: (value: SearchOptionsType) => void
    searchOptions: SearchOptionsType
    isFetching: boolean
}

export const SearchUsers: React.FC<PropsType> = (props) => {

    const [inputValue, setInputValue] = useState(props.searchOptions.term);

    useEffect(() => {
        setInputValue(props.searchOptions.term);
    }, [props.searchOptions.term]);

    const onSearch = () => {
        props.setSearchOptions({...props.searchOptions, term: inputValue, page: 1});
    };

    const debounced = useDebouncedCallback(onSearch, 1000);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        debounced.callback();
    };

    const onSearchAll = () => {
        props.setSearchOptions({...props.searchOptions, term: '', page: 1});
    };

    const disabled = props.searchOptions.page === 1 && !inputValue;

    return (
        <>
            <div className={styles.searchInputContainer} >

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