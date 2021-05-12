import React, { useEffect,} from 'react';
import { Badge } from "antd"
import { useDispatch } from "react-redux"
import {
    useHistory,
    useParams,
    NavLink
} from "react-router-dom"

import {
    SET_GROUP,
} from "../../redux/group/groupActionType"


function GroupLinkBadge(props) {

    const dispatch = useDispatch()
    const history = useHistory()
    const { idGroup, } = useParams()

    function chooseGroup ( _id, name ) {
        // get routing here
        // ...
        dispatch({type: SET_GROUP, payload: { currentGroup: {_id, name} }})
        history.push(`/group/${props._id}`)
    };

    return (
        <div style={{margin: "0.5em", maxWidth: "200px", minWidth: "150px", cursor: "pointer"}}>
            <Badge 
                className="group-badge"
                count={props.count}
                >
                <NavLink 
                    to={`/group/${props._id}`} 
                    style = {{
                        display: "inline-block",
                        borderRadius: "1em",
                        color: "black",
                        backgroundColor: "#95cbff",
                        fontWeight: "bold",
                        padding: "1em",
                    }}
                    activeStyle={{
                        backgroundColor: "#187cdc",
                        color: "white"
                    }}
                >   
                    {props.name}
                </NavLink>
            </Badge>    
        </div>
    );
}

export default GroupLinkBadge;