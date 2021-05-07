import React from 'react';



import {
    LikeOutlined,
} from "@ant-design/icons";


function Like({likeCounter}) {
    return (
        <div>
            <LikeOutlined /> {likeCounter}
        </div>
    );
}

export default Like;