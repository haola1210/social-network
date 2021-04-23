import React, { useState, } from 'react';
import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom";
import "./Search.scss"

export default function Search({search, results}) {
    
    let query = new URLSearchParams(useLocation().search);
    
    return (
        <div className="search">
            {`Search some thing ${query.get("q")}`}
        </div>
    )
}