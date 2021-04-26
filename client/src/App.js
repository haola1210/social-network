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
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import {KEEP_SESSION} from "./saga/authSessionSaga"

import NavBar from "./components/NavBar/NavBar"
import Home from "./components/Home/Home"
import Search from "./components/Search/Search"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import LeftNavBar from "./components/LeftNavBar/LeftNavBar"

import './App.scss';

export default function App() {
	// const [state, setState] = useState({
	// 	isLogin: true,
	// });

	// const {
	// 	isLogin,
	// } = state;
	
	const { accessToken } = useSelector(state => state.jwt)
	const user = useSelector(state => state.session)
	const dispatch = useDispatch();
	const history = useHistory();

	const isLogin = () => {
		return (accessToken !== null && user !== null)
	}

	useEffect(() => {

		dispatch({type : KEEP_SESSION})

	}, [])

	useEffect(() => {
		console.log('re-render')
		console.log(accessToken)
		console.log(user)
	}, [accessToken, user])

	return (
		<Router>
			<div>
				{/* {
					isLogin()? <Redirect to="/" /> : <Redirect to="/login" />
				}
				{
					isLogin()? <NavBar/> : null
				} */}
				{/* {isLogin?<NavBar/> :null}
				{isLogin?<LeftNavBar /> :null} */}

				{/* A <Switch> looks through its children <Route>s and
					renders the first one that matches the current URL. */}
				<Switch>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/search">
						<Search />
					</Route>
					<Route path="/posts">
						<Posts />
					</Route>
					<Route path="/groups">
						<Posts />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

function Posts() {

	let match = useRouteMatch();

	return (
		<div>
		<h2>Posts</h2>

		<ul>
			<li>
			<Link to={`${match.url}/components`}>Components</Link>
			</li>
			<li>
			<Link to={`${match.url}/props-v-state`}>
				Props v. State
			</Link>
			</li>
		</ul>

		{/* The Posts page has its own <Switch> with more routes
			that build on the /Posts URL path. You can think of the
			2nd <Route> here as an "index" page for all Posts, or
			the page that is shown when no Post is selected */}
		<Switch>
			<Route path={`${match.path}/:PostId`}>
			<Post />
			</Route>
			<Route path={match.path}>
			<h3>Please select a Post.</h3>
			</Route>
		</Switch>
		</div>
	);
}

function Post() {
	let { PostId } = useParams();
	return <h3>Requested Post ID: {PostId}</h3>;
}
