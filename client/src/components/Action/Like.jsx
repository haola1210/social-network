import React from 'react';
import { useSelector } from "react-redux"
import {
    LikeOutlined,
    LikeTwoTone
} from "@ant-design/icons";


function Like({ like, onClick }) {

    const { user } = useSelector(state => state.session)
    const found = like.find(userId => userId == user._id)

    return (
        <div  onClick={onClick}>
            {
                found === undefined ? 
                <LikeOutlined /> :
                <LikeTwoTone />
            } {like.length}
        </div>
    );
}

export default Like;