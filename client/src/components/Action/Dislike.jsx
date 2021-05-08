import React from 'react';



import {
    DislikeOutlined,
} from "@ant-design/icons";


function Dislike({ dislikeCounter, onClick }) {
    return (
        <div onClick={onClick}>
            <DislikeOutlined /> {dislikeCounter}
        </div>
    );
}

export default Dislike;