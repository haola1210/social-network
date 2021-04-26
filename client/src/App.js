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

import {KEEP_ALL_SESSION} from "./redux/session/sessionActionType"

import Home from "./components/Home/Home"
import Search from "./components/Search/Search"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import LeftNavBar from "./components/Groups/Groups"
import Main from "./components/Main/Main"

import './App.scss';

export default function App() {
	
	const { accessToken, user } = useSelector(state => state.session)
	const store = useSelector(state => state)
	const dispatch = useDispatch();
	const history = useHistory();
	// const location = useLocation();
	const isMobile = useMediaQuery({ maxWidth: 767 })

	const isLogin = () => {
		return (accessToken !== null && user !== null)
	}


	useEffect(() => {

		dispatch({type : KEEP_ALL_SESSION})

	}, [])

	useEffect(() => {
		console.log(store)

	}, [store])

	useEffect(() => {
		console.log('re-render')
		// console.log(accessToken)
		console.log(user)
	}, [accessToken, user,])

	// useEffect(() => {
	// 	console.log(`Welcome Home`)
	// }, [location])

	return (
		<Router>
			<div>
				{
					isLogin()? <Redirect to="/" /> : <Redirect to="/login" />
				}
				<Main isLogin={isLogin}>
					<Switch>
						<Route exact path="/login">
							<Login deviceType={isMobile}/>
						</Route>
						<Route path="/search">
							<Search deviceType={isMobile}/>
						</Route>
						<Route path="/groups">
							<LeftNavBar deviceType={isMobile}/>
						</Route>
						<Route path="/profile">
							Profile 
							{/* <Profile deviceType={isMobile}/> */}
						</Route>
						<Route path="/notifications">
							Notifications
							{/* <Notifications deviceType={isMobile}/> */}
						</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</Main>
			</div>
		</Router>
	);
}