import React from 'react';
import { 
    Row, 
    Col,
    Dropdown,
    Divider,
} from 'antd'
import { 
    HomeOutlined,
    DeploymentUnitOutlined,
    NotificationOutlined,
    UserOutlined,
    SettingOutlined
} from '@ant-design/icons'
import { useSelector, useDispatch } from "react-redux"
import { 
    useHistory, 
    NavLink,
    Link,

} from "react-router-dom"
import {
    SET_GROUP,
} from "../../redux/group/groupActionType"

import SearchComponent from "../SearchComponent/SearchComponent"
import GroupContainer from "../GroupContainer/GroupContainer"

// import { CLEAR_JWT } from "../../redux/session/sessionActionType"
import { SIGN_OUT } from '../../redux/signin/signinActionType';

import './TopNav.scss'
function TopNav(props) {

    const { user } = useSelector(state => state.session)
    const dispatch = useDispatch();
    const history = useHistory();

    const styles={
        center : {
            display: "flex",
            justifyContent : "center",
            alignItems : "center"
        }
    }

    const unsetGroup = ( _id, name ) => {
        dispatch({type: SET_GROUP, payload: { currentGroup: {_id: null, name: null} }})
    }

    const onAdmin = () => {
        unsetGroup( null, "" ) 
        
        history.push("/admin");
    }

    const onHome = () => {
        unsetGroup( null, "" ) 
        
        history.push("/");
    }

    const onProfile = () => {
        unsetGroup( null, "" ) 

        history.push("/me")
    }

    const onLogout = () => {
        console.log(`clicked Log out`)
        dispatch({
            type: SIGN_OUT
        })
        
        if (!user) {
            history.push("/login")
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
                        <Col xs={4} sm={6} style={styles.center} > 
                            {/* <Link to="/"> */}
                                <HomeOutlined onClick={onHome}/>
                            {/* </Link> */}
                        </Col>
                        
                        {/* group icon for mobile */}
                        <Col xs={4} sm={0} >
                            <div className="mobile_group_icon"> 
                                <Dropdown overlay={() => <GroupContainer title="Tổng Hợp"/>} placement="bottomCenter">   
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
                        <Col xs={4} sm={6} style={styles.center} >
                            {/* <Link to="/profile">  */}
                                <UserOutlined onClick={onProfile} /> 
                            {/* </Link> */}
                        </Col>

                        <Col xs={4} sm={6} style={styles.center} > 
                            <Dropdown overlay={() => 
                                (
                                    <div>
                                        {
                                            user.role === "admin"?
                                                // <Link to="/admin">
                                                // </Link> 
                                                <div onClick={onAdmin}> Admin </div>
                                                :
                                                null
                                        }
                                        <Link to="/setting" style={{color: "black"}}>
                                            Profile info
                                        </Link>
                                        <div onClick={onLogout}>
                                            Logout here
                                        </div>
                                    </div>
                                )
                            } placement="bottomRight">
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
            <Divider style={{marginBottom : 0}} />
        </>
    );
}

export default TopNav;