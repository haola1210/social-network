import React, { useState, useEffect, useContext } from 'react';
import { List, Badge, Divider } from "antd"
import axios from "axios"

import { useSelector, useDispatch } from "react-redux"
import {
    LIST_GROUP,
    SET_GROUP,
} from "../../redux/group/groupActionType"

import GroupLinkBadge from "../GroupLinkBadge/GroupLinkBadge"

import "./GroupContainer.scss"
function GroupContainer(props) {

    const { listGroup } = useSelector(state => state.groups)
    const dispatch = useDispatch();


    const title = props.title || false

    useEffect( () => {
        dispatch({ type: LIST_GROUP })
    }, [])

    return (
        <div style={ title ? { 
            backgroundColor : "white", 
            // padding:"1em", 
            border: "2px solid #eeeeee",
            borderTop: "none",
            borderRadius: "0 0 10px 10px",

        } : null}>
            {title && <div style={{padding : "0 1em"}}> <h3 >{title}</h3> <Divider /> </div> }
            <List 
                style = {{ maxHeight : "calc(100vh - 99px - 72px)", overflowY: "scroll", padding: "0 1em" }}
                dataSource={listGroup}
                renderItem={item => < GroupLinkBadge _id={item._id} name={item.name} count={item.count} />}
            />
        </div>
    );
}

export default GroupContainer;