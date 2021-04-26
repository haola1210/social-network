import React from 'react';
import { List, Badge } from "antd"
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
        <div style={{margin: "0.5em"}}>
            
            <Badge count={props.count}>
                <div style={{padding: "0.5em", borderRadius:"1em", backgroundColor: "gray"}}>{props.name}</div>
            </Badge>    
        </div>
    )

    return (
        <List
            dataSource={data}
            renderItem={item => < RoomNavBadge name={item.name} count={item.count} />}
        />
    );
}

export default GroupContainer;