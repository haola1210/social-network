import React from 'react';
import moment from "moment";
import { Comment, Avatar } from "antd";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled
} from "@ant-design/icons";

const initialState = {
  likeNumber: 10,
  dislikeNumber: 10,
  status: null
};


const reducer = (state, action) => {
    switch (action.type) {
      case "like_start":
        return {
          ...state,
          status: null
        };
  
      case "like_success":
        return {
          ...state,
          likeNumber: action.payload.likeNumber,
          dislike: action.payload.dislikeNumber,
          status: "liked"
        };
      case "like_failure":
        return {
          ...state,
          likeNumber: action.payload.likeNumber,
          dislike: action.payload.dislikeNumber,
          status: null
        };
      case "dislike_start":
        return {
          ...state,
          status: null
        };
  
      case "dislike_success":
        return {
          ...state,
          likeNumber: action.payload.likeNumber,
          dislike: action.payload.dislikeNumber,
          status: "disliked"
        };
      case "dislike_failure":
        return {
          ...state,
          likeNumber: action.payload.likeNumber,
          dislike: action.payload.dislikeNumber,
          status: null
        };
  
      default:
        return state;
    }
  };

function CustomComment(props) {

  const state = {}

    const like = () => {
        if (!state.status === "liked") {
            //start like
            // call api  - ko lam socket de lay like number
            // dua vao response de xem success hay fail
        }
    };
    
    const dislike = () => {
        if (!state.status === "disliked") {
            //start dislike
        }
    };

    const actions = [
        <span onClick={like}>
          {state.status === "liked" ? <LikeFilled /> : <LikeOutlined />}
          <span className="comment-action">{state.likeNumber}</span>
        </span>,
        <span onClick={dislike}>
          {state.status === "disliked" ? <DislikeFilled /> : <DislikeOutlined />}
          <span className="comment-action">{state.dislikeNumber}</span>
        </span>
      ];

    return (
        <Comment
            actions={actions}
            author={<a>Han Solo</a>}
            avatar={
                <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
                />
            }
            content={
                <p>
                We supply a series of design principles, practical patterns and high
                quality design resources (Sketch and Axure), to help people create
                their product prototypes beautifully and efficiently.
                </p>
            }
            datetime={<span>{moment().fromNow("HH:mm DD-MM-YYYY")}</span>}
        />
    );
}

export default CustomComment;