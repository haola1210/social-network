import React, { useEffect, } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Spin } from "antd"

import Admin from "../Admin/Admin"

function AdminRoute ({ component: Component, ...rest })  {
    const { user, isFetching } = useSelector(state => state.session)
    
    useEffect(() => {
        console.log(`Admin Routes ${isFetching}`)
        console.log(`user`)
        console.log(user)
    },[isFetching, user])

    return (
        <Route {...rest} >
            {
                isFetching ? 
                (<Spin spinning={isFetching} size="large"/>)
                :
                (
                    user ? 
                        user.role === "admin"?
                            <Admin />
                            :
                            <Component />
                        :
                        <Redirect to="/login" />
                )
            }
        </Route>
            
    )
}

export default AdminRoute;