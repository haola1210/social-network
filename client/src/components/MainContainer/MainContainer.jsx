import React, { useState, useEffect, useContext, } from 'react';
import {useSelector, useDispatch } from "react-redux"
import {
    useParams,
} from "react-router-dom";

import { Divider, Row, Spin, message } from "antd"
import { LoadingOutlined } from '@ant-design/icons';

import GroupContainer from "../GroupContainer/GroupContainer"
import NewFeedPost from "../NewFeedPost/NewFeedPost"
import WritePost from "../WritePost/WritePost"
import TitleGroup from "../TitleGroup/TitleGroup"

import { CLEAR_ERROR } from "../../redux/error/errorActionType"
import { FETCH_MORE_POST } from '../../redux/post/postActionType';

import "./MainContainer.scss"
import { CLEAR_MESS } from '../../redux/notification/notificationActionType';

function MainContainer( props ) {

    const { location } = useSelector(state => state.groups)
    const { user } = useSelector(state => state.session)
    const { posts, error, mess } = useSelector(state => state)

    const dispatch = useDispatch()
    const [greeting, setGreeting] = useState("")
    useEffect(() => {
    
        if(location){
            if(location.type === "g"){
                setGreeting(`${location.name} xin chào!`)
            } else if (location.type === "n"){
                setGreeting(`Chào ${user.name}! Newfeed của bạn có điều mới đấy!`)
            } else if (location.type === "u"){
                setGreeting(`Đây là dòng thời gian của ${location.name}`)
            }
        }
        console.log(greeting)
    }, [location])

    useEffect(() => {
        if(error.content){
            message.error(error.content)
            dispatch({ type: CLEAR_ERROR })
        }
    }, [error])

    useEffect(() => {
        if(mess.content){
            message.success(mess.content)
            dispatch({ type : CLEAR_MESS })
        }
    }, [mess.content])

    return (
        <div className="main">
            {/* left nav link for desktop */}
            <div className="main__left">
                <div className="main__left__title">
                    <h3>Tổng Hợp</h3>
                    <Divider />
                </div>
                <GroupContainer />
            </div>
            
            <div className="main__right">

                {
                    
                    (<Row style={{
                        display: "flex", 
                        flexDirection: "row", 
                        justifyContent: "center", 
                        alignItems: "center",
                    }}>
                        <TitleGroup greeting={ greeting } />
                    </Row>)
                        
                }
                {/* write post */}
                <Row style={{
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "center",
                
                }}>
                    <WritePost  />
                </Row>

                {/* posts here */}
                <Row style={{
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "center",
                
                }}>
                    {
                        posts.posts.map((post) => 
                            <div className="post" key={post._id} >
                                <NewFeedPost post={post}  />
                            </div>
                        )
                    }

                    {
                        posts.isFetching ? 
                        (<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />) : 
                        (
                            <p className="load-more" onClick={ () => dispatch({ 
                                type : FETCH_MORE_POST,
                                payload : { location : props.location }
                            })}> 
                                load more 
                            </p>
                        )
                    }
               </Row>
            </div>
            
        </div>
    );
}

export default MainContainer;