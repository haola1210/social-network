import React, { useEffect} from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { Row, Spin, Divider, } from "antd"

import {
    SEARCH_START,
    SEARCH_POSTS,
    SEARCH_GROUPS,
    SEARCH_PEOPLE,
    SEARCH_SUCCESS,
} from "../../redux/search/searchActionType"

import TitleSearch from "../TitleSearch/TitleSearch"
import SearchPost from "../SearchPost/SearchPost"

export default function SearchContainer ({ type, filter }) {

    const types = [ "posts", "people", "groups", ]
    const { results } = useSelector(state => state.search)
    const { socket, } = useSelector(state => state.session)
    const dispatch = useDispatch()

    useEffect(() => {
        if(socket) {
            socket.once("server-send-search-results", ({ posts, groups, people}) => {
                dispatch({type: SEARCH_START})
                if (posts && groups && people) {
                    dispatch({type: SEARCH_SUCCESS, payload: { posts, groups, people}})
                } else if (posts) {
                    dispatch({type: SEARCH_POSTS, payload: { posts }})
                } else if (groups) {
                    dispatch({type: SEARCH_POSTS, payload: { groups }})
                } else if (people) {
                    dispatch({type: SEARCH_POSTS, payload: { people }})
                }
            })
            
        }
    },[ results ])

    return (
        <div>
            
            { filter === "all" ? 
                types.map(type => (
                    <div>
                        <Row style={{
                            display: "flex", 
                            flexDirection: "column", 
                            justifyContent: "center", 
                            alignItems: "center",
                            
                        }}>
                            <Divider style={{alignItems: "center"}}/>
                            <TitleSearch filter={type} name={`${type.charAt(0).toUpperCase() + type.slice(1)}`}/>
                        </Row>
                        {type==="posts" &&
                            <Row style={{
                                display: "flex", 
                                flexDirection: "column", 
                                justifyContent: "center", 
                                alignItems: "center",
                            }}>
                                {
                                    results.posts.map((post) => 
                                        <div className="post" key={post._id} >
                                            <SearchPost post={post}  />
                                        </div>
                                    )
                                }
                            </Row>
                        }
                    </div>
                )) : null
            }
            {filter !== "all" && filter === "posts" && 
                <Row style={{
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "center",
                }}>
                    {
                        results.posts.map((post) => 
                            <div className="post" key={post._id} >
                                <SearchPost post={post}  />
                            </div>
                        )
                    }

                    {
                        // posts.isFetching ? 
                        // (<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />) : 
                        // (<p 
                        //     className="load-more" 
                        //     onClick={ () => dispatch({ type : FETCH_MORE_POST })}
                        // > load more </p>)
                    }


                </Row>
            }
        </div>

    )
}