import React, { useState, useEffect, } from 'react';
import { Input } from 'antd'
import { 
    useHistory, 
    useRouteMatch, 
    useParams,
} from 'react-router-dom'

function SearchComponent(props) {
    const { Search } = Input
    const [state, setState] = useState("")
    const history = useHistory()
    const { url } = useRouteMatch();
    const { query, filter } = useParams()

    const onSearch = () => {
        if (state) {
            const search = encodeURIComponent(state.replace("%", "%25")).replace("'", "%27")
            history.push(`/search/all/${search}`)
        }
    }

    useEffect(() => {
        if (filter && query) {
            
            const search = decodeURIComponent(query)
            setState(search)
        }
    }, [ query ])

    return (
        <Search 
            allowClear 
            width={100} 
            value={state}
            onSearch={onSearch} 
            placeholder="search..." 
            onChange={(event) => setState(event.target.value)}
        />
    );
}

export default SearchComponent;