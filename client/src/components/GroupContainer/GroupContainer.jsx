import React, { useEffect, } from 'react';
import { List, Divider } from "antd"
import { useSelector, useDispatch } from "react-redux"
import {
    LIST_GROUP,
    LIST_GROUP_SUCCESS,
} from "../../redux/group/groupActionType"
import {
    useParams,
} from "react-router-dom";
import GroupLinkBadge from "../GroupLinkBadge/GroupLinkBadge"

import "./GroupContainer.scss"
function GroupContainer(props) {

    const { socket, user, } = useSelector(state => state.session)
    const { listGroup } = useSelector(state => state.groups)
    const dispatch = useDispatch();

    const title = props.title || false

    useEffect( () => {
        // dispatch({ type: LIST_GROUP })
        if(socket) {
            socket.emit("client-get-list-groups")
            socket.once("server-send-list-groups", ({listGroup}) =>{
                if (listGroup.length > 0) {
                    dispatch({ type: LIST_GROUP_SUCCESS , payload: { listGroup }})

                }
            })
        }
    }, [socket])

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
                renderItem={item => < GroupLinkBadge _id={item._id} name={item.name} count={item.count} key={item._id}/>}
            />
        </div>
    );
}

export default GroupContainer;