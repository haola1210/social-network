import React, { useState, useEffect, } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { Spin } from "antd"

import {KEEP_SESSION} from "./redux/session/sessionActionType"

import Home from "./components/Home/Home"
import Search from "./components/Search/Search"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import LeftNavBar from "./components/Groups/Groups"
import Main from "./components/Main/Main"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

import './App.scss';

export default function App() {
	
	const { user, } = useSelector(state => state.session)
	const { isLoading, } = useSelector(state => state.login)
	const store = useSelector(state => state)
	const dispatch = useDispatch();

	const isLogin = () => {
		return ( user !== null)
	}

	useEffect(() => {

		dispatch({type : KEEP_SESSION})

	}, [])

	useEffect(() => {
		console.log(store)

	}, [store])

	useEffect(() => {

		console.log('re-render')
		console.log(user)
	}, [ user, ])

	return (
		<Router>
			<div>
				{
					isLoading === null && user === null? 
                    // <Spin spinning={isLoading} delay={500}>
                    //     <div> Loading... </div>
                    // </Spin>
					""
                    :
                    user? 
                        <Redirect to="/" />
                        :
                        <Redirect to="/login" />
				}
				<Switch>
					<Route exact path="/login" component={Login}/>
					<Route path="/" component={Home} user={user}/>
				</Switch>
			</div>
		</Router>
	);
}