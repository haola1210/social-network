import React from 'react';



import {
    DislikeOutlined,
} from "@ant-design/icons";


function Dislike({dislikeCounter}) {
    return (
        <div>
            <DislikeOutlined /> {dislikeCounter}
        </div>
    );
}

export default Dislike;