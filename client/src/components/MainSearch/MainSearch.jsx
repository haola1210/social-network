import React, { useState, useEffect, } from 'react';
import {useSelector, useDispatch } from "react-redux"
import {
    useParams,
} from "react-router-dom";

import { Divider, Row, Spin, message } from "antd"
import { LoadingOutlined } from '@ant-design/icons';

import TypeSearchContainer from "../TypeSearchContainer/TypeSearchContainer"
import TitleSearch from "../TitleSearch/TitleSearch"
import SearchContainer from "../SearchContainer/SearchContainer"

import { CLEAR_ERROR } from "../../redux/error/errorActionType"
import { FETCH_MORE_POST } from '../../redux/post/postActionType';

import "./MainSearch.scss"

function MainSearch( props ) {

    const { posts, error, mess } = useSelector(state => state)
    const { filter } = useParams()

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
                
                <div>
                    <SearchContainer filter={filter} />
                </div> 
            </div>
            
        </div>
    );
}

export default MainSearch;