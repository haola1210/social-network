import React from 'react';
import "./TitleSearch.scss"
export default function Title ({ name, filter}) {
    return (
        <div className={`title-search title-search__${filter}`}>
            {name}
        </div>
    )
}