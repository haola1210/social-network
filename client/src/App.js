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

import {KEEP_SESSION} from "./redux/session/sessionActionType"

import Home from "./components/Home/Home"
import Login from "./components/Login/Login"


import PrivateRoute from "./components/Route/PrivateRoute"
import PublicRoute from "./components/Route/PublicRoute"

import './App.scss';

export default function App() {
	
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({type : KEEP_SESSION})
	}, [])

	return (
		<Router>
			<div>
				<Switch>
					<PublicRoute exact path="/login" component={Login}/>
					<PrivateRoute path="/" component={Home} />
				</Switch>
			</div>
		</Router>
	);
}