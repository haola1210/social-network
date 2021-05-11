import React, { useEffect, } from 'react';
import { List, Divider } from "antd"
import { useSelector, useDispatch } from "react-redux"
import {
    LIST_GROUP,
} from "../../redux/group/groupActionType"
import TypeSearchLinkBadge from "../TypeSearchLinkBadge/TypeSearchLinkBadge"

import "./TypeSearchContainer.scss"
function TypeSearchContainer(props) {

    // const { listGroup } = useSelector(state => state.groups)
    const listTypeSearch = [
        {_id: "0", name: "All", value: "all"},
        {_id: "1", name: "Posts", value: "posts"},
        {_id: "2", name: "People", value: "people"},
        {_id: "3", name: "Groups", value: "groups"},
    ]
    const title = props.title || false

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
                style = {{ maxHeight : "calc(100vh - 99px - 72px)", padding: "0 1em" }}
                dataSource={listTypeSearch}
                renderItem={item => < TypeSearchLinkBadge data={item} />}
            />
        </div>
    );
}

export default TypeSearchContainer;