import React, { useState, useEffect, useContext } from 'react';
import { List, Badge, Divider } from "antd"
import axios from "axios"
import Item from 'antd/lib/list/Item';
import { useSelector, useDispatch } from "react-redux"
import {
    LIST_GROUP,
    SET_GROUP,
} from "../../redux/group/groupActionType"

import { GroupContext, GroupConsumer } from "../GroupContext/GroupContext"

import "./GroupContainer.scss"

function GroupContainer(props) {

    const { listGroup } = useSelector(state => state.groups)
    const dispatch = useDispatch();

    const [ state, setState ] = useState({
        groups: [],
    }) 

    // const chooseGroup = ( _id, name ) => {
    //     groupContext.onGroup( _id, name )
    // }

    function chooseGroup ( _id, name ) {
        // get routing here
        // ...
        dispatch({type: SET_GROUP, payload: { currentGroup: {_id, name} }})
    };

    const RoomNavBadge = props => {
        return (
            <div style={{margin: "0.5em", maxWidth: "150px", minWidth: "130px"}}>
                    <Badge 
                        className="group-badge"
                        count={props.count}
                        >
                        <div 
                            onClick={() => chooseGroup( props._id, props.name )}
                            className="group-badge__text"
                            style={{padding: "1em", borderRadius:"1em", backgroundColor: "#95cbff", fontWeight: "bold"}}
                            >
                            {props.name}
                        </div>
                    </Badge>    
            </div>
    )}

    const title = props.title || false

    useEffect( () => {
        dispatch({ type: LIST_GROUP })
    }, [])

    return (
        <div style={ title ? { 
            backgroundColor : "white", 
            padding:"1em", 
            border: "2px solid #eeeeee",
            borderTop: "none",
            borderRadius: "0 0 10px 10px"
        } : null}>
            {title && <div> <h3>{title}</h3> <Divider /> </div> }
            <List
                dataSource={listGroup}
                renderItem={item => < RoomNavBadge _id={item._id} name={item.name} count={item.count} />}
            />
        </div>
    );
}

export default GroupContainer;