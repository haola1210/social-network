import React, { useState, useEffect, } from 'react';
import { 
    Link,
    useHistory,
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { 
    Menu,
    Input, 
} from 'antd';
import { 
    DeploymentUnitOutlined,
    ArrowLeftOutlined,
    SearchOutlined,
    AppstoreOutlined, 
    TeamOutlined,
    PlusCircleOutlined,
    MailOutlined, 
    NotificationOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { CLEAR_JWT } from '../../redux/auth/authActionType'
import "./NavBar.scss";

import Avatar from "../Avatar/Avatar"

const { SubMenu } = Menu;
const { Search } = Input;

export default function NavBar(){

    const { accessToken } = useSelector(state => state.jwt)

    const history = useHistory();
    const dispatch = useDispatch();
    const [ state, setState ] = useState({
        menu: "home",
    })
    
    const onMenuClick = ({ item, key, keyPath, domEvent }) => {
        if (key !== undefined) {
            console.log("Menu Clicked!!!")
            console.log(key, keyPath)
            setState(prev=>{return {
                ...prev,
                menu: key,
            }})
        }
    }

    const onSearch = (value, event) => {
        console.log(`onSearch`)
        console.log(value)
        const search = value.replace(" ", "%20")
        history.push(`/search/top?q=${search}`)
    }

    useEffect(() => {
        console.log("State")
        console.log(state)
        if (state.menu === "logout") {
            console.log(`clicked Log out`)
            dispatch({
                type: CLEAR_JWT
            })

            if (!accessToken) {
                history.push("/login")
                
            }
        }
    },[state, accessToken])

    return (
        
        <div className="nav-bar">
                <div className="nav-bar__menu-flex-start">
                    <Menu 
                        onClick={onMenuClick} 
                        selectedKeys = {[state.menu]}
                        mode="horizontal"
                    >
                        {state.menu ==="search"?
                            <Menu.Item key="" icon={<ArrowLeftOutlined />}/> 
                            : 
                            <Menu.Item 
                                key="home" 
                                icon={<DeploymentUnitOutlined />}
                            >
                                <Link to="/">
                                    Home
                                </Link>
                            </Menu.Item>
                        } 
                        <Menu.Item 
                            key="search" 
                            icon={ state.menu ==="search"?null:<SearchOutlined />}
                        >
                            {state.menu ==="search"?
                                <Search placeholder="Search" allowClear bordered={false} onSearch={onSearch}  />
                                :
                                "Search"
                            }
                        </Menu.Item>
                        
                    </Menu>
                </div>
                <div className="nav-bar__menu-center">
                    <Menu
                        onClick={onMenuClick} 
                        selectedKeys = {[state.menu]}
                        mode="horizontal"
                    >
                        <Menu.Item 
                            key="add" 
                            icon={<PlusCircleOutlined />}
                        >   
                            <Link to="add">
                                Add
                            </Link>
                        </Menu.Item>
                        <Menu.Item 
                            key="posts" 
                            icon={<AppstoreOutlined />}
                        >
                            <Link to="/posts">
                                Posts
                            </Link>
                        </Menu.Item>
                        <Menu.Item 
                            key="groups" 
                            icon={<TeamOutlined />}
                        >
                            <Link to="/groups">
                                Groups
                            </Link>
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="nav-bar__menu-flex-end">
                    <Menu
                        onClick={onMenuClick} 
                        selectedKeys = {[state.menu]}
                        mode="horizontal"
                    >
                        <Menu.Item 
                            key="profile" 
                            icon={<Avatar />}
                        >
                            <Link to="/profile" rel="noopener noreferrer">
                            {/* Profile */}
                            </Link>
                        </Menu.Item>
                        <Menu.Item 
                            key="messages" 
                            icon={<MailOutlined />}
                        >
                            <Link to="messages">
                                {/* Messages */}
                            </Link>
                        </Menu.Item>
                        <SubMenu
                            submenukey="notifications" 
                            icon={<NotificationOutlined />}
                            // title= "Notifications"
                        >
                            <Menu.Item
                                key="noti:1" 
                            >
                                test Notification
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu 
                            key="setting" 
                            icon={<SettingOutlined />} 
                            // title="Setting"
                        >
                            <Menu.Item key="logout">
                                {/* <Link to="/login"> */}
                                    Log out
                                {/* </Link> */}
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        
    )
}