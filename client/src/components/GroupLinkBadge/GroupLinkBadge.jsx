import React from 'react';
import { Badge } from "antd"
import { useDispatch } from "react-redux"

import {
    SET_GROUP,
} from "../../redux/group/groupActionType"
import "./GroupLinkBadge.scss"


function GroupLinkBadge(props) {

    const dispatch = useDispatch()

    function chooseGroup ( _id, name ) {
        // get routing here
        // ...
        dispatch({type: SET_GROUP, payload: { currentGroup: {_id, name} }})
    };



    return (
        <div style={{margin: "0.5em", maxWidth: "200px", minWidth: "150px"}}>
            <Badge 
                className="group-badge"
                count={props.count}
                >
                <div 
                    onClick={() => chooseGroup( props._id, props.name )}
                    className="group-badge__text"
                    style={{
                        padding: "1em",
                        borderRadius: "1em",
                        backgroundColor: "#95cbff",
                        fontWeight: "bold"
                    }}
                    >
                    {props.name}
                </div>
            </Badge>    
        </div>
    );
}

export default GroupLinkBadge;