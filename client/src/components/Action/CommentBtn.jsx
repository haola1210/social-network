import React from 'react';



import {
    CommentOutlined,
} from "@ant-design/icons";


function CommentBtn({ cmtCounter, onClick }) {
    return (
        <div onClick={onClick}>
            <CommentOutlined /> {cmtCounter}
        </div>
    );
}

export default CommentBtn;