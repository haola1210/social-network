import React, { useState, useEffect,} from 'react';
import { Badge } from "antd"
import { useSelector, } from "react-redux"
import {
    NavLink
} from "react-router-dom"

function GroupLinkBadge(props) {

    const [state, setState] = useState(0)
    const { socket, user, } = useSelector(state => state.session)
    const { listGroup, } = useSelector(state => state.groups)

    useEffect(() => {
        if (socket) {
            socket.emit("client-get-unread-posts", { idGroup : props._id, idUser: user._id })
            socket.on("server-send-unread-posts", ({ idGroup: belongToGroup, count }) => {
                if (count.length > 0 && belongToGroup === props._id) {
                    console.log("unread count", props.name, count)
                    setState(count.length)
                    const groups = listGroup.map(group =>{
                        let posts = count.filter(post => post.belongToGroup === props._id)
                        return {

                        }
                    })
                }
            })
        }
    }, [socket, props])

    return (
        <div style={{margin: "0.5em", maxWidth: "200px", minWidth: "150px", cursor: "pointer"}}>
            <Badge 
                className="group-badge"
                count={state}
                // count={2}
                // count={props.count}
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