import React, { useEffect, } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { KEEP_SESSION } from "../../redux/session/sessionActionType"
import { Spin } from "antd"

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user, accessToken } = useSelector(state => state.session)
    const { isLoading } = useSelector(state => state.login)

    useEffect(() => {
        console.log(`Protected Routes ${isLoading}`)
        console.log(`user ${user}`)
    },[isLoading, user,])

    return (
        <Route {...rest} 
            render={
                isLoading === null && user === null? 
                    <Spin spinning={isLoading} delay={500}>
                        <div> Loading... </div>
                    </Spin>
                    :
                    user? 
                        <Redirect to="/" />
                        :
                        <Redirect to="/login" />
            }
            >
            {
				<Component />
            }
        </Route>
    )
}

export default ProtectedRoute;