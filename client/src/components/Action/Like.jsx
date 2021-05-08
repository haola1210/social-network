import React from 'react';



import {
    LikeOutlined,
} from "@ant-design/icons";


function Like({ likeCounter, onClick }) {
    return (
        <div  onClick={onClick}>
            <LikeOutlined /> {likeCounter}
        </div>
    );
}

export default Like;