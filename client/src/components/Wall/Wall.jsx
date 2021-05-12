import React, { useState, useEffect, } from 'react'
import { 
    Row, 
    Col, 
    Card, 
    Input, 
    Button, 
    Tooltip, 
    Modal, 
    Avatar, 
    Form, 
    Upload,
    message ,
    Spin
} from 'antd'
import { 
    UploadOutlined, 
    PlusOutlined, 
    PhoneOutlined, 
    LockOutlined, 
    HighlightOutlined, 
    EyeTwoTone,
    EyeInvisibleOutlined,
    LoadingOutlined,
} from '@ant-design/icons'
import { useParams, } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import TopNav from "../TopNav/TopNav"
import WritePost from "../WritePost/WritePost"
import NewFeedPost from "../NewFeedPost/NewFeedPost"
import {
    FETCH_POST_START,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAILURE,
    FETCH_MORE_POST,
} from "../../redux/post/postActionType"

import "./Wall.scss"

export default function Wall (props) {

    const [uploadModalVisible, setUploadModalVisible] = useState(false);
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);
	const [confirmUploadImageLoading, setConfirmUploadImageLoading] = useState(false);
    const [state, setState] = useState({
        _id: "",
        email: "",
        name: "", 
        password: "", 
        newPassword: "", 
        image: "",
        fileList: [],
        previewVisible: false,
		previewImage: "",
		previewTitle: "",
        posts: [],
    })
    const { idProfile, } = useParams()
    const key = 'updatable';

    const { Meta } = Card;
    const { user, socket, } = useSelector(state => state.session)
    const { posts, } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        if (socket) {
            socket.emit("client-get-user-profile", { _id: idProfile, })
            socket.once("server-send-user-profile", ({ user: userProfile, error }) => {
                if (error && error !== undefined) {
                    console.log("user profile", error.message);
                } else if (userProfile) {
                    console.log("server-send-user-profile", userProfile)
                    setState(prev => {return {
                        ...prev, 
                        _id: userProfile._id,
                        email: userProfile.email,
                        name: userProfile.name,
                        image: userProfile.image,
                        fileList: userProfile.image !== null && userProfile.image !== undefined ?[
                            {
                                uid: '0',
                                name: `${userProfile._id}_avatar.png`,
                                status: 'done',
                                url: userProfile.image || "",
                            }
                        ]:[],
                    }}) 
                    
                    socket.emit("client-get-user-posts", { _id: idProfile, })
                    dispatch({type: FETCH_POST_START})
                    socket.once("server-send-user-posts", ({ error, posts, }) => {
                        console.log("server-send-user-posts", posts)
                        if (error && error !== undefined) {
                            
                            dispatch({type: FETCH_POST_FAILURE})
                        } else if (posts && posts.length > 0) {

                            dispatch({type: FETCH_POST_SUCCESS, payload: { posts }})
                        }
                    })
                }
            })
        }
    }, [idProfile])

    useEffect(() => {
        // console.log("posts", posts)
    }, [ posts, ])

    return(
        <div>
            <TopNav />
            <div className="wall">
                <div className="wall__title">
                    <Card
                        hoverable
                        cover={<img alt="example" src={state.image || `https://ui-avatars.com/api/?background=random&size=200&name=${state.name.split(" ").join("+")}`} className="profile__image"/>}
                    >
                        <Meta title={state.name} description={`Role: ${state.role}`} style={{ textAlign: "center"}} />
                    </Card>
                </div>
                <div style={{ width: "100%"}}>
                    <Row style={{
                        display: "flex", 
                        flexDirection: "column", 
                        justifyContent: "center", 
                        alignItems: "center",
                    
                    }}>
                        <WritePost  />
                    </Row>
                    <Row style={{
                            display: "flex", 
                        flexDirection: "column", 
                        justifyContent: "center", 
                        alignItems: "center",
                    
                    }}>
                        
                        {posts.posts.length > 0 ?
                            posts.posts.map((post) => 
                                <div className="post" key={post._id} >
                                    <NewFeedPost post={post}  />
                                </div>
                            )
                            : "Không có bài viết"
                        }

                        {
                            posts.isFetching ? 
                            (<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />) : 
                            (
                                <p className="load-more" onClick={ () => dispatch({ 
                                    type : FETCH_MORE_POST,
                                    payload : { location : { owner: idProfile}, limit: 10 }
                                })}> 
                                    load more 
                                </p>
                            )
                        }
                    </Row>
                </div>
            </div>
            
        </div>
    )
}