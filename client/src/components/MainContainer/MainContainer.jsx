import React, { useState, useEffect, useContext, } from 'react';
import {useSelector, useDispatch } from "react-redux"

import { Divider, Row, Spin, message } from "antd"
import { LoadingOutlined } from '@ant-design/icons';

import GroupContainer from "../GroupContainer/GroupContainer"
import NewFeedPost from "../NewFeedPost/NewFeedPost"
import WritePost from "../WritePost/WritePost"
import TitleGroup from "../TitleGroup/TitleGroup"

import { CLEAR_ERROR } from "../../redux/error/errorActionType"
import { FETCH_MORE_POST } from '../../redux/post/postActionType';

import "./MainContainer.scss"

function MainContainer() {

    const { currentGroup } = useSelector(state => state.groups)
    const { user } = useSelector(state => state.session)
    const { posts, error, mess } = useSelector(state => state)

    const dispatch = useDispatch()
    useEffect(() => {
        if(error.content){
            message.error(error.content)
            dispatch({ type: CLEAR_ERROR })
        }
    }, [error])

    useEffect(() => {
        if(mess.content){
            message.success(mess.content)
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
                    currentGroup !== null && currentGroup._id !== null? 
                        (<Row style={{
                            display: "flex", 
                            flexDirection: "row", 
                            justifyContent: "center", 
                            alignItems: "center",
                        }}>
                            <TitleGroup name={currentGroup.name} greeting="xin chào!"/>
                        </Row>)
                        : 
                        (<Row style={{
                            display: "flex", 
                            flexDirection: "row", 
                            justifyContent: "center", 
                            alignItems: "center",
                        }}>
                            <TitleGroup greeting={`Chào ${user.name}! Chúc ngày tốt lành`}/>
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
                                <NewFeedPost post = {post}  />
                            </div>
                        )
                    }

                    {
                        posts.isFetching ? 
                        (<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />) : 
                        (<p className="load-more" onClick={ () => dispatch({ type : FETCH_MORE_POST })}> load more </p>)
                    }
               </Row>
            </div>

        </div>
    );
}

export default MainContainer;