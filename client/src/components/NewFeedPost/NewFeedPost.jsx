import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"

import { Card, Avatar, Typography, Carousel, Image } from "antd";
import {
  RightOutlined ,
  LeftOutlined,
  ArrowRightOutlined
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

function NewFeedPost({ post }) {

    const [state, setState] = useState({
        postId: post._id,
        comments : [],
        loading : false,
        error : null,
        isShow : false
    });
    const slider = useRef(null)

    const { socket, user } = useSelector(state => state.session)
    const dispatch = useDispatch()

    const onReact = ( reaction ) => {
        // console.log(reaction, " post ", post.content)
        socket.emit("client-react-post", { id: post._id, user: user._id, reaction})
    }

    // const toGroup = (_id, name) => {
        
    //     dispatch({type: SET_GROUP, payload: { currentGroup: {_id, name} }})
    // }
/////////////////////////////////////////////////////////////// socket process here
    useEffect(() => {
        if (socket) {
            socket.once("server-send-react-post", ({ error, post : reactedPost, postId }) => {
                if (error && error !== null && postId == post._id) {
                    console.log(error)
                    setState({
                        ...state, 
                        loading: false,
                        error : error.message
                    })
                } else if (reactedPost && postId === post._id) {
                    console.log("reacted post", reactedPost)
                    dispatch({ type: REACT_POST, payload: { reactedPost }})
                }
            })
        }
    }, [ post ])


    useEffect(() => {
        setState({
            ...state, 
            loading: true,
            error : null
        })
        if (socket) {
            socket.emit("client-req-cmt", { postId : post._id })
            socket.on("server-send-comment-list", response => {
                if(response.error && response.postId == post._id) {
                    console.log(response.error.message)
                    setState({
                        ...state, 
                        loading: false,
                        error : response.error.message
                    })
                } else if(response.comments && response.postId == post._id){
                    // console.log(post._id, response.comments)
                    setState({
                        ...state, 
                        loading: false,
                        comments : response.comments,
                        error : null
                    })
                } 
                
            })
        }
    }, [post._id])


    useEffect(() => {
        if (socket) {
            socket.on("server-send-comment-post", ({ error, comment, belongToPost}) => {
                if (error !== null && error !== undefined && error) {
                    console.log("error", error.message)
                }
                if (comment && belongToPost === post._id ) {
                    
                    setState({
                        ...state,
                        comments : [comment, ...state.comments]
                    })
                }
            })
        }
    }, [state])

///////////////////////////////////////////////////////////////////////////////////////

    return (
        <div style={{ width: "100%", margin: "1em 0" }}>
            <Card
                style={{ width: "100%" }}
                actions={[
                    <Like onClick={() => onReact("likes")} like={post.likes} />, 
                    <Dislike onClick={()=> onReact("dislikes")} dislike={post.dislikes} />,
                    <CommentBtn cmtCounter={state.comments.length} onClick={() => setState(prev => ({...prev, isShow : !prev.isShow}))} />
                ]}
            >
                <Meta
                    avatar={
                        post.owner.image 
                        ? 
                        <Avatar src={post.owner.image} /> 
                        : 
                        (<div style={{
                            width: "32px",
                            height: "32px",
                            paddingBottom: "5px",
                            borderRadius: "16px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color : "red",
                            backgroundColor: "orange",
                            fontWeight: "bold",
                            fontSize: "1.5em",
                            textTransform : "uppercase"
                        }}
                        
                        >{post.owner.name[0]}</div>)
                    }
                title={
                    <p style={{ marginBottom: 0 }}>
                        <b>
                            {/* { post.owner.name }{post.belongToGroup && 
                                <span>
                                    <ArrowRightOutlined /> {post.belongToGroup.name}
                                    </span>
                            } */}
                            
                            <NavLink 
                                style={{color: 'black'}}
                                // onClick={() => toGroup(post.belongToGroup._id, post.belongToGroup.name)} 
                                to={`/user/${post.owner._id}`}>{post.owner.name}</NavLink>
                            {post.belongToGroup && 
                                <span>
                                    <ArrowRightOutlined /> 
                                    <NavLink 
                                        style={{color: 'black'}}
                                        // onClick={() => toGroup(post.belongToGroup._id, post.belongToGroup.name)} 
                                        to={`/group/${post.belongToGroup._id}`}>{post.belongToGroup.name}</NavLink>
                                </span>
                            }
                        </b>
                        <br />
                        <small>
                            { moment(post.createdAt).format('hh:mm, Do MMMM YYYY') }
                        </small>
                    </p>
                }
                style={{ padding: "1em", userSelect:"none" }}
                />


                {/* content */}
                <Card.Grid style={{ width: "100%", paddingBottom:0 }} hoverable={false}>

                    <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
                        {
                            post.content
                        }
                    </Paragraph>
                    
                        
                        <Carousel ref={slider}>
                            {
                                post.image.map((url, index) => (<Image 
                                    key= {index}
                                    style={{ width: "100%" }}
                                    src={url}
                                />))
                            }  
                        </Carousel>
                        <div style={{width: "100%", display:"flex", justifyContent:"space-between", padding:5}}>
                            { post.image.length > 1 ?  <LeftOutlined onClick={() => slider.current.next()} onSelect={() => false} /> : null }
                            { post.image.length > 1 ? (<RightOutlined onClick={() => slider.current.prev()} onSelect={() => false}/>) : null }
                        </div>
                
                
                </Card.Grid>
            </Card>

            {/* comment container*/}
            {state.isShow && <CommentContainer containerState = {state} setContainerState = {(obj) => setState(obj)} />}
        </div>
  
    );
}

export default React.memo(NewFeedPost);