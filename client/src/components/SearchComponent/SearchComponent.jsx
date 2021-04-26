import React from 'react';
import { Input } from 'antd'
// import { SearchOutlined } from "@ant-design/icons"

function SearchComponent(props) {
    const { Search } = Input

    const onSearch = () => {

    }
    return (
        <Search onSearch={onSearch} allowClear placeholder="search..." width={100} />
    );
}

export default SearchComponent;