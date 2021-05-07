import React from 'react';
import "./TitleGroup.scss"
export default function Title ({ name, greeting }) {
    return (
        <div className = "title-group">
            {name} {greeting}
        </div>
    )
}