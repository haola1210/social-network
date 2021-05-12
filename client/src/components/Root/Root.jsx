import React, { useEffect } from 'react';
import { useDispatch } from "react-redux"
import { INIT_SOCKET, TERMINATE_SOCKET } from "../../socketClient"
import {
    Route,
    Switch
} from "react-router-dom";
import Wall from '../Wall/Wall';
import Profile from '../Profile/Profile';
import Search from '../Search/Search';
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
            <Route path="/profile/:idProfile" component={Wall} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/search/:filter/:query" component={Search} />
            <Route path="/group/:idGroup" component={Home} />
            {/* <Route path="/user/:idUser" component={Home} /> */}
            <Route exact path="" component={Home} />
        </Switch>
    );
}

export default Root;