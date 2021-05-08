import React from 'react';
import { useSelector } from "react-redux"


import {
    DislikeOutlined,
    DislikeTwoTone
} from "@ant-design/icons";


function Dislike({ dislike, onClick }) {

    const { user } = useSelector(state => state.session)
    const found = dislike.find(userId => userId == user._id)

    return (
        <div onClick={onClick}>
            {
                found === undefined ? 
                <DislikeOutlined /> : 
                <DislikeTwoTone />
            } {dislike.length}
        </div>
    );
}

export default Dislike;