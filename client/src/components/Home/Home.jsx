import React, { useState, useEffect, } from 'react';

import { useDispatch } from "react-redux"

import TopNav from "../TopNav/TopNav.jsx"
import MainContainer from "../MainContainer/MainContainer"
import { GroupProvider } from "../GroupContext/GroupContext"

import { INIT_SOCKET } from "../../socketClient"

export default function Home() {
    
    const dispatch = useDispatch()

    // const [group, setGroup] = useState({
    //     name: "",
    //     _id: "",
    // });

    // function onGroup ( _id, name ) {
    //     setGroup({ _id, name, })
    //     console.log("setGroup ", _id, name)
    // };

    useEffect(() => {
        dispatch({ type : INIT_SOCKET })
    }, [])
    
    return (
        <div>
            {/* <GroupProvider value={{...group, onGroup}}> */}
                <TopNav />
                <MainContainer />
            {/* </GroupProvider> */}
        </div>
    )
}