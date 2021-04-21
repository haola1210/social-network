import React from 'react';
import "./Avatar.scss"

export default function Avatar({src}) {
    return (
        <img
            className="avatar"
            src={src?src: "https://picsum.photos/40"}
            alt="User Avatar"
        />
    )
}