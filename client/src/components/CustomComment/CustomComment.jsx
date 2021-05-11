import React from 'react';
import moment from "moment";
import { Comment, Avatar } from "antd";
// import {
//   DislikeOutlined,
//   LikeOutlined,
//   DislikeFilled,
//   LikeFilled
// } from "@ant-design/icons";

// const initialState = {
//   likeNumber: 10,
//   dislikeNumber: 10,
//   status: null
// };


// const reducer = (state, action) => {
//     switch (action.type) {
//       case "like_start":
//         return {
//           ...state,
//           status: null
//         };
  
//       case "like_success":
//         return {
//           ...state,
//           likeNumber: action.payload.likeNumber,
//           dislike: action.payload.dislikeNumber,
//           status: "liked"
//         };
//       case "like_failure":
//         return {
//           ...state,
//           likeNumber: action.payload.likeNumber,
//           dislike: action.payload.dislikeNumber,
//           status: null
//         };
//       case "dislike_start":
//         return {
//           ...state,
//           status: null
//         };
  
//       case "dislike_success":
//         return {
//           ...state,
//           likeNumber: action.payload.likeNumber,
//           dislike: action.payload.dislikeNumber,
//           status: "disliked"
//         };
//       case "dislike_failure":
//         return {
//           ...state,
//           likeNumber: action.payload.likeNumber,
//           dislike: action.payload.dislikeNumber,
//           status: null
//         };
  
//       default:
//         return state;
//     }
//   };

function CustomComment({ data }) {

  const state = {}

    console.log(data)

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

    // const actions = [
    //     <span onClick={like}>
    //       {state.status === "liked" ? <LikeFilled /> : <LikeOutlined />}
    //       <span className="comment-action">{state.likeNumber}</span>
    //     </span>,
    //     <span onClick={dislike}>
    //       {state.status === "disliked" ? <DislikeFilled /> : <DislikeOutlined />}
    //       <span className="comment-action">{state.dislikeNumber}</span>
    //     </span>
    //   ];

    return (
        <Comment
            style={{padding: "0 1em", backgroundColor: '#f1f1f1', width: "100%", borderRadius: "1em"}}
            // actions={actions}
            author={<p>{ data.owner.name }</p>}
            avatar={
                data.owner.image 
                ? 
                <Avatar src={data.owner.image} /> 
                : 
                (<div style={{
                    width: "24px",
                    height: "24px",
                    paddingBottom: "5px",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color : "red",
                    backgroundColor: "orange",
                    fontWeight: "bold",
                    fontSize: "1em",
                    textTransform : "uppercase"
                }}>{data.owner.name[0]}</div>)
            }
            content={
                <p> { data.content } </p>
            }
            datetime={<span>{moment( data.createdAt ).fromNow("HH:mm DD-MM-YYYY")}</span>}
        />
    );
}

export default React.memo(CustomComment);