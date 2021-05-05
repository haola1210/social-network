import React, { useEffect, } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Spin } from "antd"

function PublicRoute({component : Component, ...rest}) {

    const { user, isFetching } = useSelector(state => state.session)

    return (
        <Route { ...rest } >
            {
                isFetching?
                (<Spin spinning={isFetching}  size="large"/>):
                (user === null ?
                    <Component />
                    :
                    <Redirect to="/" />    
                )
            }
        </Route>
    );
}

export default PublicRoute;