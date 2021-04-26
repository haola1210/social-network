import React from 'react';
import { 
    Row, 
    Col,
    Dropdown,
    Divider 
} from 'antd'
import { 
    HomeOutlined,
    DeploymentUnitOutlined,
    NotificationOutlined,
    UserOutlined,
    SettingOutlined
} from '@ant-design/icons'

import SearchComponent from "../SearchComponent/SearchComponent"
import GroupContainer from "../GroupContainer/GroupContainer"


import './TopNav.scss'
function TopNav(props) {

    const styles={
        center : {
            display: "flex",
            justifyContent : "center",
            alignItems : "center"
        }
    }

    return (
        <>
            <Row style={{padding: "1em 1em 0 1em"}} >
                <Col xs={6}>
                    <div className="logo">
                        <span>T</span>
                        <span>D</span>
                        <span>T</span>
                        <span>zone</span>
                    </div>
                </Col>

                {/* search for desktop */}
                <Col xs={0} sm={10} > 
                    <SearchComponent />
                </Col>
                
                {/* icon container */}
                <Col xs={18} sm={8}  >
                    <Row style={{height: "100%"}}>
                        
                        <Col xs={4} sm={0}></Col>
                        {/*  */}
                        <Col xs={4} sm={6} style={styles.center} > <HomeOutlined /> </Col>
                        
                        {/* group icon for mobile */}
                        <Col xs={4} sm={0} >
                            <div className="mobile_group_icon"> 
                                <Dropdown overlay={GroupContainer} placement="bottomCenter">
                                    <DeploymentUnitOutlined /> 
                                </Dropdown>
                            </div>
                        </Col>

                        {/*  */}
                        <Col xs={4} sm={6} style={styles.center} > 
                            <Dropdown overlay="Notification" placement="bottomCenter">
                                <NotificationOutlined /> 
                            </Dropdown>
                        </Col>

                        {/*  */}
                        <Col xs={4} sm={6} style={styles.center} > <UserOutlined /> </Col>

                        {/*  */}
                        <Col xs={4} sm={6} style={styles.center} > 
                            <Dropdown overlay="logout here" placement="bottomRight">
                                <SettingOutlined /> 
                            </Dropdown>
                        </Col>
                    </Row>

                </Col>
            </Row>
            
            {/* search row for mobile */}
            <div className="mobile_search">
                <SearchComponent />
            </div>
            <Divider />
        </>
    );
}

export default TopNav;