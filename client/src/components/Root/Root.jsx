import React, { useEffect } from 'react';
import { useDispatch } from "react-redux"
import { INIT_SOCKET, TERMINATE_SOCKET } from "../../socketClient"
import {
    Route,
    Switch
} from "react-router-dom";
import Profile from '../Profile/Profile';
import Home from '../Home/Home';

function Root(props) {

    const dispatch = useDispatch()

    useEffect(() => {
        console.log("init_socket")
        dispatch({ type : INIT_SOCKET })

        return () => {
            dispatch({ type : TERMINATE_SOCKET })
        } 
    }, [])

    return (
        <Switch>
            <Route path="/me" component={Profile} />
            <Route path="/group/:idGroup" component={Home} />
            <Route path="/user/:idUser" component={Home} />
            <Route exact path="" component={Home} />
        </Switch>
    );
}

export default Root;