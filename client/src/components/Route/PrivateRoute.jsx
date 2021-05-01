import React, { useEffect, } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Spin } from "antd"

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user, isFetching } = useSelector(state => state.session)
    

    useEffect(() => {
        console.log(`Protected Routes ${isFetching}`)
        console.log(`user ${user}`)
    },[isFetching, user])

    return (
        <Route {...rest} >
            {
                isFetching ? 
                (<Spin spinning={isFetching} delay={500}>
                    <div> Loading... </div>
                </Spin>)
                :
                (
                    user ? 
                        <Component />
                        :
                        <Redirect to="/login" />
                )
            }
        </Route>
            
    )
}

export default ProtectedRoute;