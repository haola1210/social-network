import React from 'react';
import { Badge } from 'antd';
import { Menu } from 'antd';
import { UnorderedListOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import Sider from 'antd/lib/layout/Sider';


export default function LeftNavBar() {
const { SubMenu } = Menu




        return (
            <Menu 
                // onClick={this.handleClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                
                <Menu.Item key="1" icon={<HomeOutlined />}> Phòng Đại Học <Badge count={999} offset={[10, -10]}></Badge></Menu.Item>
                
                <Menu.Item key="2" icon={<HomeOutlined />}> Phòng Đại Học <Badge count={999} offset={[10, -10]}></Badge> </Menu.Item>
               

                <Menu.Item key="3" icon={<HomeOutlined />}> Phòng Đại Học <Badge count={999} offset={[10, -10]} ></Badge> </Menu.Item>
               
                <Menu.Item key="4" icon={<HomeOutlined />}> Phòng Đại Học <Badge count={999} offset={[10, -10]} ></Badge> </Menu.Item>
                

                <Menu.Item key="5" icon={<HomeOutlined />}> Phòng Đại Học <Badge count={999} offset={[10, -10]} ></Badge> </Menu.Item>
                
                <Menu.Item key="6" icon={<HomeOutlined />}> Phòng Đại Học <Badge count={999} offset={[10, -10]} ></Badge> </Menu.Item>
                
                   
            </Menu>
        );
    }



