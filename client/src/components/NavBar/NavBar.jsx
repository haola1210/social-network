import React, { useState, useEffect, } from 'react';
import { 
    Link,
    useHistory,
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { 
    Menu,
    Input, 
    Tooltip,
} from 'antd';
import { 
    DeploymentUnitOutlined,
    ArrowLeftOutlined,
    SearchOutlined,
    HomeOutlined, 
    TeamOutlined,
    PlusCircleOutlined,
    NotificationOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { CLEAR_JWT } from '../../redux/session/sessionActionType'
import "./NavBar.scss";

import Avatar from "../Avatar/Avatar"

const { SubMenu } = Menu;
const { Search } = Input;

export default function NavBar({ deviceType: isMobile }){

    const { user } = useSelector(state => state.session)

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

    const changeToSearch = () => {

        setState(prev=>{return {
            ...prev,
            menu: "search",
        }})
    }
    
    const denySearch = () => {
        setState(prev=>{return {
            ...prev,
            menu: "",
        }})
    }

    useEffect(() => {
        console.log("State")
        console.log(state)
        
        if (state.menu === "logout") {
            console.log(`clicked Log out`)
            dispatch({
                type: CLEAR_JWT
            })

            if (!user) {
                history.push("/login")
            }
        }
    },[state, user, ])

    return (
        <div>
            <div className={isMobile ? "nav-bar-mobile" : "nav-bar"}>
                <div className="nav-bar__menu-flex-start nav-bar-mobile__menu-flex-start">
                    {state.menu === "search" && !isMobile?
                        
                        <Tooltip trigger="hover" placement="bottom" title="Back Home">
                            <ArrowLeftOutlined onClick={ denySearch } className="nav-bar__menu-flex-start__logo-arrow"/>
                        </Tooltip>
                        : 
                        <Link to="/">
                            <Tooltip trigger="hover" placement="bottom" title="Home">
                                <DeploymentUnitOutlined 
                                    className="nav-bar__menu-flex-start__logo nav-bar-mobile__menu-flex-start__logo" />
                            </Tooltip>
                        </Link>
                    } 
                    {/* Search */}
                    {!isMobile && 
                        <Menu 
                            onClick={onMenuClick} 
                            selectedKeys = {[state.menu]}
                            mode="horizontal"
                            triggerSubMenuAction="click"
                        >
                            <Menu.Item 
                                key="search" 
                                icon={ state.menu ==="search"?null:<SearchOutlined />}
                            >
                                {state.menu ==="search"?
                                    <Search 
                                        className="nav-bar__menu-flex-start__search"
                                        placeholder="Search" 
                                        allowClear 
                                        bordered={false} 
                                        onSearch={onSearch}
                                        outFocused={denySearch}
                                        onBlur={ denySearch } />
                                    :
                                    "Search"
                                }
                            </Menu.Item>
                        </Menu>
                    }
                </div>
                <div className="nav-bar__menu-center">
                    <Menu
                        onClick={onMenuClick} 
                        selectedKeys = {[state.menu]}
                        mode="horizontal"
                        triggerSubMenuAction="click"
                    >
                        {/* Add */}
                        {!isMobile && 
                            <Menu.Item 
                                key="add" 
                                icon={<PlusCircleOutlined />}
                            >   
                                <Link to="add">
                                    Add
                                </Link>
                            </Menu.Item>
                        }
                        <Menu.Item 
                            key="home" 
                            icon={<HomeOutlined />}
                        >
                            <Link to="/">
                                {!isMobile && "Home"}
                            </Link>
                        </Menu.Item>
                        <Menu.Item 
                            key="groups" 
                            icon={<TeamOutlined />}
                        >
                            <Link to="/groups">
                                {!isMobile && "Groups"}
                            </Link>
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="nav-bar__menu-flex-end">
                    <Menu
                        onClick={onMenuClick} 
                        selectedKeys = {[state.menu]}
                        mode="horizontal"
                        triggerSubMenuAction="click"
                    >
                        <Menu.Item 
                            key="profile" 
                            icon={<Avatar />}
                        >
                            {/* Profile */}
                            <Link to="/profile" />
                        </Menu.Item>
                        {!isMobile? 
                            <SubMenu
                                submenukey="notifications" 
                                icon={ <Tooltip trigger="hover" placement="bottom" title="Notifications"><NotificationOutlined /></Tooltip>}
                            >
                                <Menu.Item key="noti:idNoti" 
                                >
                                    test Notification
                                </Menu.Item>
                            </SubMenu>
                            :
                            <Menu.Item 
                                key="notifications" 
                                icon={<Tooltip trigger="hover" placement="bottom" title="Notifications"><NotificationOutlined /></Tooltip>}
                            >
                                {/* Profile */}
                                <Link to="/notifications" />
                            </Menu.Item>
                        }    
                        <SubMenu 
                            key="setting"
                            icon={ <Tooltip trigger="hover" placement="bottom" title="Settings"><SettingOutlined /></Tooltip>}
                        >
                            <Menu.Item key="logout">
                                Log out
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                
            </div>

            {/* Search on Mobile */}
            {isMobile &&
                <div className="nav-bar-mobile-action">
                    <div>
                        {state.menu !== "search"?
                            <SearchOutlined className="nav-bar-mobile-action__logo" />
                            :
                            <ArrowLeftOutlined 
                                onClick={ denySearch } 
                                className="nav-bar-mobile-action__logo"/>
                        }
                    </div>
                    <div>
                        {state.menu !== "search"?
                            <Input 
                                className="nav-bar-mobile-action__search"
                                bordered={false} 
                                placeholder="Search" 
                                onFocus={changeToSearch}
                                />
                            :
                            <Search 
                                className="nav-bar-mobile-action__search"
                                placeholder="Search" 
                                allowClear 
                                bordered={false} 
                                onSearch={onSearch}
                                onBlur={denySearch}/>
                        }
                    </div>
                </div>
            }
        </div>
        
    )
}