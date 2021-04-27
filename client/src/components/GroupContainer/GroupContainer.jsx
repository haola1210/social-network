import React from 'react';
import { List, Badge, Divider } from "antd"
import Item from 'antd/lib/list/Item';

function GroupContainer(props) {

    const data = [
        {name : "Phòng Khoa", count: 19},
        {name : "Phòng Đại Học", count: 19},
        {name : "Phòng Tài Chính", count: 19},
        {name : "Phòng CTSV", count: 19},
        {name : "Phòng Bệnh Hơn Chữa Bệnh", count: 19},
        {name : "Phòng Cháy", count: 19},

    ]


    const RoomNavBadge = props => (
        <div style={{margin: "0.5em", maxWidth: "150px", minWidth: "130px"}}>
            
            <Badge count={props.count}>
                <div style={{padding: "1em", borderRadius:"1em", backgroundColor: "#95cbff", fontWeight: "bold"}}>{props.name}</div>
            </Badge>    
        </div>
    )
    const title = props.title || false
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
                dataSource={data}
                renderItem={item => < RoomNavBadge name={item.name} count={item.count} />}
            />
        </div>
    );
}

export default GroupContainer;