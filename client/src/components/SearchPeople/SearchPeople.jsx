import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"

import { Card, Avatar, Typography, Carousel, Image } from "antd";
import {
  RightOutlined ,
  LeftOutlined,
  ArrowRightOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { NavLink, } from "react-router-dom"

import CommentContainer from "../CommentContainer/CommentContainer";
import Like from "../Action/Like"
import Dislike from "../Action/Dislike"
import CommentBtn from "../Action/CommentBtn"

import { REACT_POST } from "../../redux/post/postActionType"
import {
    SET_GROUP,
} from "../../redux/group/groupActionType"

const { Meta } = Card;
const { Paragraph } = Typography;

function SearchPeople({ item }) {

    const [state, setState] = useState({
        // postId: item._id,
        // comments : [],
        loading : false,
        error : null,
        isShow : false
    });
    const slider = useRef(null)

    const { socket, user } = useSelector(state => state.session)
    const dispatch = useDispatch()

    const toGroup = (_id, name) => {
        dispatch({type: SET_GROUP, payload: { currentGroup: {_id, name} }})
    }
/////////////////////////////////////////////////////////////// socket process here
    useEffect(() => {
        if (socket) {
            // socket.once("server-send-react-post", ({ error, post : reactedPost, postId }) => {
            //     if (error && error !== null && postId == post._id) {
            //         console.log(error)
            //         setState({
            //             ...state, 
            //             loading: false,
            //             error : error.message
            //         })
            //     } else if (reactedPost && postId === post._id) {
            //         console.log("reacted post", reactedPost)
            //         dispatch({ type: REACT_POST, payload: { reactedPost }})
            //     }
            // })
        }
    }, [ item ])


    useEffect(() => {
        setState({
            ...state, 
            loading: true,
            error : null
        })
        if (socket) {
            // socket.emit("client-req-cmt", { postId : item._id })
            // socket.on("server-send-comment-list", response => {
            //     if(response.error && response.postId == item._id) {
            //         console.log(response.error.message)
            //         setState({
            //             ...state, 
            //             loading: false,
            //             error : response.error.message
            //         })
            //     } else if(response.comments && response.postId == item._id){
            //         // console.log(item._id, response.comments)
            //         setState({
            //             ...state, 
            //             loading: false,
            //             comments : response.comments,
            //             error : null
            //         })
            //     } 
                
            // })
        }
    }, [item._id])


    // useEffect(() => {
    //     if (socket) {
    //         socket.on("server-send-comment-post", ({ error, comment, belongToPost}) => {
    //             if (error !== null && error !== undefined && error) {
    //                 console.log("error", error.message)
    //             }
    //             if (comment && belongToPost === post._id ) {
                    
    //                 setState({
    //                     ...state,
    //                     comments : [comment, ...state.comments]
    //                 })
    //             }
    //         })
    //     }
    // }, [state])

///////////////////////////////////////////////////////////////////////////////////////

    return (
        <div style={{ width: "100%", margin: "1em 0" }}>
            <Card
                style={{ width: "100%" }}
                actions={[]}
            >
                <Meta
                    avatar={
                        item.image 
                        ? 
                        <Avatar src={item.image} /> 
                        : 
                        <Avatar src={`https://ui-avatars.com/api/?background=random&size=400&name=${item.name.split(" ").join("+")}`} /> 
                    }
                    title={
                        <p style={{ marginBottom: 0 }}>
                            <b>
                                <NavLink 
                                    style={{color: 'black'}}
                                    // onClick={() => toGroup(item._id, item.name)} 
                                    to={`/user/${item._id}`}>{item.name}
                                </NavLink>
                            </b>
                            <br />
                        </p>
                    }
                    style={{ padding: "1em", userSelect:"none" }}
                />
            </Card>
        </div>
  
    );
}

export default React.memo(SearchPeople);