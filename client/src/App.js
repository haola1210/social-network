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
import Admin from "./components/Admin/Admin"
import { GroupProvider } from "./components/GroupContext/GroupContext"

import PrivateRoute from "./components/Route/PrivateRoute"
import PublicRoute from "./components/Route/PublicRoute"
import AdminRoute from "./components/Route/AdminRoute"

import './App.scss';

export default function App() {
	
	const dispatch = useDispatch();

	const [group, setGroup] = useState({
        name: "",
        _id: "",
    });

    function onGroup ( _id, name ) {
        setGroup(prev => {return{ 
			...prev,
			_id: _id, 
			name: name, 
		}})
    };

	useEffect(() => {
		dispatch({type : KEEP_SESSION})
	}, [])

	return (
		<Router>
			<div>
				<GroupProvider value={{...group, onGroup}}>
					<Switch>
						<PublicRoute exact path="/login" component={Login}/>
						<AdminRoute exact path="/admin" component={Admin} />
							<PrivateRoute path="/" component={Home} />
					</Switch>
				</GroupProvider>
			</div>
		</Router>
	);
}