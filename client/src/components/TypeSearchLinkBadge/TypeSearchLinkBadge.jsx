import React from 'react';
import { Badge } from "antd"
import {
    useHistory,
    useParams,
} from "react-router-dom"

import "./TypeSearchLinkBadge.scss"

function TypeSearchLinkBadge(props) {

    const history = useHistory()
    const { query } = useParams()

    function chooseFilter ( _id, ) {
        history.push(`/search/${props.data.value}/${query}`)
    };

    return (
        <div style={{margin: "0.5em", maxWidth: "200px", minWidth: "150px"}}>
            <Badge className="group-badge">
                <div 
                    onClick={() => chooseFilter( props.data.value )}
                    className="group-badge__text"
                    style={{
                        padding: "1em",
                        borderRadius: "1em",
                        backgroundColor: "#95cbff",
                        fontWeight: "bold"
                    }}
                    >
                    {props.data.name}
                </div>
            </Badge>    
        </div>
    );
}

export default TypeSearchLinkBadge;