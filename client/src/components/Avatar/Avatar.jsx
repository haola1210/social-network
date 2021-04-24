import React from 'react';
import {
    Tooltip,
} from "antd"
import "./Avatar.scss"

export default function Avatar({src}) {
    return (
        <Tooltip trigger="hover" placement="bottom" title="Profile">
            <img
                className="avatar"
                src={src?src: "https://picsum.photos/40"}
                alt="User Avatar"
                />
        </Tooltip>
    )
}