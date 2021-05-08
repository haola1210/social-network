import React, { useEffect, } from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { useDispatch } from 'react-redux'

import {KEEP_SESSION} from "./redux/session/sessionActionType"

import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import Admin from "./components/Admin/Admin"

import PrivateRoute from "./components/Route/PrivateRoute"
import PublicRoute from "./components/Route/PublicRoute"
import AdminRoute from "./components/Route/AdminRoute"

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
					<AdminRoute exact path="/admin" component={Admin} />
						<PrivateRoute path="/" component={Home} />
				</Switch>
			</div>
		</Router>
	);
}