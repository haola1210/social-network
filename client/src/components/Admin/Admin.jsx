import React, { useEffect } from 'react';

import { useDispatch } from "react-redux"

import TopNav from "../TopNav/TopNav"
import AdminContainer from "../AdminContainer/AdminContainer"
// import CreateUser from "../CreateUser/CreateUser"

import { INIT_SOCKET } from "../../socketClient"

export default function Admin() {
    
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch({ type : INIT_SOCKET })
    // }, [])

    return (
        <div>
            <TopNav />
            <AdminContainer />
            {/* <CreateUser /> */}
        </div>
    )
}