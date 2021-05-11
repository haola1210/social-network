import React, { useEffect, } from 'react';
import { useDispatch } from "react-redux"
import {
    useParams,
} from "react-router-dom";

import TopNav from "../TopNav/TopNav.jsx"
import MainContainer from "../MainContainer/MainContainer"

import { INIT_SOCKET } from "../../socketClient"

export default function Home(props) {
    
    const dispatch = useDispatch()
    const { idGroup } = useParams()

    useEffect(() => {
        console.log("home", idGroup)
        dispatch({ type : INIT_SOCKET, payload : { group : idGroup } })
    }, [idGroup])
    
    return (
        <div>
            <TopNav />
            <MainContainer />
        </div>
    )
}