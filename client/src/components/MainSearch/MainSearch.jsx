import React, { useState, useEffect, } from 'react';
import {useSelector, useDispatch } from "react-redux"
import {
    useParams,
} from "react-router-dom";

import { Divider, Row, Spin, message } from "antd"
import { LoadingOutlined } from '@ant-design/icons';

import TypeSearchContainer from "../TypeSearchContainer/TypeSearchContainer"
import NewFeedPost from "../NewFeedPost/NewFeedPost"
import TitleSearch from "../TitleSearch/TitleSearch"
import SearchContainer from "../SearchContainer/SearchContainer"

import { CLEAR_ERROR } from "../../redux/error/errorActionType"
import { FETCH_MORE_POST } from '../../redux/post/postActionType';

import "./MainSearch.scss"

function MainSearch( props ) {

    const { posts, error, mess } = useSelector(state => state)
    const { filter } = useParams()
    const types = [ "Posts", "People", "Groups", ]

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
                    <h3>Kết quả tìm kiếm</h3>
                    <Divider />
                </div>
                <TypeSearchContainer />
            </div>
            
            <div className="main__right">

                <Row style={{
                    display: "flex", 
                    flexDirection: "row", 
                    justifyContent: "center", 
                    alignItems: "center",
                }}>
                    <TitleSearch name={`${filter.charAt(0).toUpperCase() + filter.slice(1)}`}/>
                </Row>
                { filter === "all" ? 
                    types.map(type => (
                        <div>
                            {type}
                            <SearchContainer filter={filter} />
                        </div> 
                    )) : null
                }
                        {/* : 
                        (<Row style={{
                            display: "flex", 
                            flexDirection: "row", 
                            justifyContent: "center", 
                            alignItems: "center",
                        }}>
                            <TitleSearch greeting={`Chào ${user.name}! Chúc ngày tốt lành`}/>
                        </Row>)
                } */}
                {/* write post */}
                {/* <Row style={{
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "center",
                
                }}>
                    <WritePost  />
                </Row> */}

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
                        (<p className="load-more" onClick={ () => dispatch({ type : FETCH_MORE_POST })}> load more </p>)
                    }
               </Row>
            </div>
            
        </div>
    );
}

export default MainSearch;