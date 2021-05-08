import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"

import { Card, Avatar, Typography, Carousel, Image } from "antd";
import {
  RightOutlined ,
  LeftOutlined
} from "@ant-design/icons";

import CommentContainer from "../CommentContainer/CommentContainer";
import Like from "../Action/Like"
import Dislike from "../Action/Dislike"
import CommentBtn from "../Action/CommentBtn"

import { REACT_POST } from "../../redux/post/postActionType"
const { Meta } = Card;
const { Paragraph } = Typography;

function NewFeedPost({ post }) {

    const [state, setState] = useState({
        comments : [],
        loading : false,
        error : null,
        isShow : false
    });
    const slider = useRef(null)

    const { socket, user } = useSelector(state => state.session)
    const { posts } = useSelector(state => state.posts)
    const dispatch = useDispatch()

    const onReact = ( reaction ) => {
        console.log(reaction, " post ", post.content)
        socket.emit("client-react-post", { id: post._id, user: user._id, reaction})
        socket.on("server-send-react-post", ({ error, post : reactedPost, postId }) => {
            if (error && error !== null && postId == post._id) {
                console.log(error)
                setState({
                    ...state, 
                    loading: false,
                    error : error.message
                })
            }
            if (reactedPost && postId == post._id) {
                console.log("reacted post", reactedPost)
                dispatch({ type: REACT_POST, payload: { reactedPost }})
            }
        })
    }

/////////////////////////////////////////////////////////////// socket process here
    useEffect(() => {
        console.log("re-render")
        setState({
            ...state, 
            loading: true,
            error : null
        })
        socket.emit("client-req-cmt", { postId : post._id })
        socket.on("server-send-comment-list", response => {
            if(response.comments && response.postId == post._id){
                console.log(response.comments)
                setState({
                    ...state, 
                    loading: false,
                    comments : response.comments,
                    error : null
                })
            } 
            if(response.error && response.postId == post._id) {
                console.log(response.error.message)
                setState({
                    ...state, 
                    loading: false,
                    error : response.error.message
                })
            }
        })
        
    }, [ post ])
///////////////////////////////////////////////////////////////////////////////////////

    return (
        <div style={{ width: "100%", margin: "1em 0" }}>
            <Card
                style={{ width: "100%" }}
                actions={[
                    <Like onClick={() => onReact("likes")} likeCounter={post.likes.length} />, 
                    <Dislike onClick={()=> onReact("dislikes")} dislikeCounter={post.dislikes.length} />,
                    <CommentBtn cmtCounter={0} onClick={() => setState(prev => ({...prev, isShow : !prev.isShow}))} />
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
                title={post.owner.name}
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
            {state.isShow && <CommentContainer containerState = {state} />}
        </div>
  
    );
}

export default React.memo(NewFeedPost);