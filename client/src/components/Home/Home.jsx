import React, { useState, useEffect, } from 'react';

import { useDispatch } from "react-redux"

import TopNav from "../TopNav/TopNav.jsx"
import MainContainer from "../MainContainer/MainContainer"
import { GroupProvider } from "../GroupContext/GroupContext"

import { INIT_SOCKET } from "../../socketClient"

export default function Home() {
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type : INIT_SOCKET })
    }, [])
    
    return (
        <div>
            <TopNav />
            <MainContainer />
        </div>
    )
}