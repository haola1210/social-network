import React, { useState, } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import NavBar from "./components/NavBar/NavBar"
import Home from "./components/Home/Home"
import Search from "./components/Search/Search"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import LeftNavBar from "./components/LeftNavBar/LeftNavBar"
import './App.scss';

export default function App() {
	const [state, setState] = useState({
		isLogin: true,
	});
	
	const {
		isLogin,
	} = state;
  
	return (
		<Router>
		<div>
			{isLogin?<NavBar/> :null}
			{isLogin?<LeftNavBar /> :null}

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
