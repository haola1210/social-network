import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from "react-redux"
import {
    useParams,
    useLocation
} from "react-router-dom";

import TopNav from "../TopNav/TopNav.jsx"
import MainContainer from "../MainContainer/MainContainer"

import { FETCH_POST } from "../../redux/post/postActionType"
import { FETCH_LOCATION } from '../../redux/group/groupActionType.js';

export default function Home(props) {
    
    const dispatch = useDispatch()
    const { socket, user } = useSelector(state => state.session)

    const { idGroup } = useParams()
    const { idUser } = useParams()
    const url = useLocation().pathname.split("/")

    let location = {} //query condition
    if(idGroup){
        location = { belongToGroup : idGroup }
    }

    if(idUser){
        location = { owner : idUser }
    }

    if(url[1] === "me"){
        location = { owner : user._id, belongToGroup: null }
        
    }
    useEffect(() => {
        ////////////////////////////////////////////////////////////////////// init post here
        console.log(location)
        if(socket){
            dispatch({
                type : FETCH_LOCATION, payload : { location }
            })
            dispatch({
                type: FETCH_POST, payload: { location }
            })
            
        }
        
        //////////////////////////////////////////////////////////////////////
    }, [location])
    
    return (
        <div>
            <TopNav />
            <MainContainer location={location} />
        </div>
    )
}