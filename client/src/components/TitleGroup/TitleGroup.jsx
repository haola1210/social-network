import React from 'react';
import "./TitleGroup.scss"
export default function Title ({ name }) {
    return (
        <div className = "title-group">
            Title Group:  <h1>{name}</h1>
        </div>
    )
}