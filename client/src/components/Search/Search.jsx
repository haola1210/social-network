import React, { useEffect, } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TopNav from "../TopNav/TopNav.jsx"
import MainSearch from "../MainSearch/MainSearch"

export default function Home(props) {
    
    const { socket } = useSelector(state => state.session)
    const { filter, query, } = useParams();
    const searchQuery = decodeURIComponent(query)
    
    useEffect(() =>{
        // console.log("filter", filter, "query", searchQuery)
        socket.emit(`client-search-${filter}`, { query: searchQuery }) 
    }, [ filter, query, ])

    return (
        <div>
            <TopNav />
            <MainSearch />
        </div>
    )
}