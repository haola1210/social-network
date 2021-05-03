import React from 'react';
import { Divider, Row, Col } from "antd"

import GroupContainer from "../GroupContainer/GroupContainer"
import NewFeedPost from "../NewFeedPost/NewFeedPost"
import WritePost from "../WritePost/WritePost"

import "./MainContainer.scss"

const posts = [1,1,1,1,1,1,1]
function MainContainer(props) {
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
                {/* write post */}
                <Row style={{
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "center",
                
                }}>
                    <WritePost />
                </Row>

                {/* posts here */}
                <Row style={{
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "center",
                
                }}>
                    {
                        posts.map((post, index) => 
                            <div className="post" key={index} >
                                <NewFeedPost  />
                            </div>
                        )
                    }
               </Row>
            </div>

        </div>
    );
}

export default MainContainer;