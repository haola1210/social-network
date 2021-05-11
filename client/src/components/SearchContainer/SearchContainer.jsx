import React from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { Row, Spin, } from "antd"

import SearchPost from "../SearchPost/SearchPost"

export default function SearchContainer ({ filter }) {

    // const { search } = useSelector(state => state.search)
    const dispatch = useDispatch()

    return (
        <div>

            {filter==="posts" || filter==="all" && 
                <Row style={{
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "center",
                
                }}>
                    {/* {posts.posts.map((post) =>  */}
                        <div className="post" key={0} >
                            {/* <SearchPost post={post}  /> */}
                            asdjasdljh
                        </div>
                    {/* )} */}
                    {/* {
                        posts.posts.map((post) => 
                        // <div className="post" key={post._id} >
                        //     <SearchPost post={post}  />
                        // </div>
                        )
                    } */}

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