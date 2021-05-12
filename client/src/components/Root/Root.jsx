import React, { useEffect } from 'react';
import { useDispatch } from "react-redux"
import { INIT_SOCKET, TERMINATE_SOCKET } from "../../socketClient"
import {
    Route,
    Switch
} from "react-router-dom";
import Profile from '../Profile/Profile';
import Search from '../Search/Search';
import Home from '../Home/Home';
import AdminRoute from '../Route/AdminRoute';
import Admin from '../Admin/Admin';

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
            <AdminRoute path="/admin" component={Admin} />
            <Route path="/me" component={Home} />
            <Route path="/setting" component={Profile} />
            <Route path="/search/:filter/:query" component={Search} />
            <Route path="/group/:idGroup" component={Home} />
            <Route path="/user/:idUser" component={Home} />
            <Route exact path="" component={Home} />
        </Switch>
    );
}

export default Root;