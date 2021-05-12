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
import SearchGroup from "../SearchGroup/SearchGroup"
import SearchPeople from "../SearchPeople/SearchPeople"

export default function SearchContainer ({ type, filter }) {

    const types = [ 
        "groups", 
        "people", 
        "posts", 
    ]
    const { results } = useSelector(state => state.search)
    const { socket, } = useSelector(state => state.session)
    const dispatch = useDispatch()

    const SearchItemType = (type) => {
        console.log("searchItemType", type, results[type])
        return (
            <Row style={{
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center",
            }}>
                {
                    results[type].map((item) => 
                        <div className="post" key={item._id} >
                            {type==="posts" && <SearchPost item={item} />}
                            {type==="groups" && <SearchGroup item={item} />}
                            {type==="people" && <SearchPeople item={item} />}
                        </div>
                    )
                }
            </Row>
        )
    }
    // {
    //     // posts.isFetching ? 
    //     // (<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />) : 
    //     // (<p 
    //     //     className="load-more" 
    //     //     onClick={ () => dispatch({ type : FETCH_MORE_POST })}
    //     // > load more </p>)
    // }
    useEffect(() => {
        if(socket) {
            socket.once("server-send-search-results", ({ posts, groups, people}) => {
                dispatch({type: SEARCH_START})
                if (posts && groups && people) {
                    dispatch({type: SEARCH_SUCCESS, payload: { posts, groups, people}})
                } else if (posts) {
                    dispatch({type: SEARCH_POSTS, payload: { posts }})
                } else if (groups) {
                    dispatch({type: SEARCH_GROUPS, payload: { groups }})
                } else if (people) {
                    dispatch({type: SEARCH_PEOPLE, payload: { people }})
                }
            })
            
        }
    },[ results ])

    return (
        <div>
            <div>
                { filter === "all" && 
                    types.map((type, index) => (
                        <div key={index}>
                            <Row style={{
                                display: "flex", 
                                flexDirection: "column", 
                                justifyContent: "center", 
                                alignItems: "center",
                                
                            }}>
                                <Divider style={{alignItems: "center"}}/>
                                <TitleSearch filter={type} name={`${type.charAt(0).toUpperCase() + type.slice(1)}`}/>
                            </Row>
                            
                            {type === "groups" && SearchItemType("groups")}
                            {type === "people" && SearchItemType("people")}
                            {type === "posts" && SearchItemType("posts")}
                        </div>
                    )) 
                }
            </div>
            {filter !== "all" && filter === "posts" && SearchItemType(filter)}
            {filter !== "all" && filter === "groups" && SearchItemType(filter)}
            {filter !== "all" && filter === "people" && SearchItemType(filter)}
            
        </div>

    )
}