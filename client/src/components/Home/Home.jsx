import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from "react-redux"
import {
    useParams,
} from "react-router-dom";

import TopNav from "../TopNav/TopNav.jsx"
import MainContainer from "../MainContainer/MainContainer"

import { FETCH_POST } from "../../redux/post/postActionType"

export default function Home(props) {
    
    const dispatch = useDispatch()
    const { socket } = useSelector(state => state.session)

    const { idGroup } = useParams()
    const { idUser } = useParams()

    let location = {} //query condition
    if(idGroup){
        location = { belongToGroup : idGroup }
    }

    if(idUser){
        location = { owner : idUser }
    }

    useEffect(() => {
        ////////////////////////////////////////////////////////////////////// init post here
        if(socket){
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