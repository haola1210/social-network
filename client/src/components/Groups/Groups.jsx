import React from 'react';
import { Badge } from 'antd';
import { Menu } from 'antd';
import { UnorderedListOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import Sider from 'antd/lib/layout/Sider';
import {
    Link,
} from "react-router-dom"

export default function LeftNavBar({ deviceType: isMobile}) {
    const { SubMenu } = Menu
    
    const groups = [
        {
            id: "0",
            name: "Phòng Công tác học sinh sinh viên (CTHSSV)",
            notifications: 0,
        },

        {
            id: "1",
            name: "Phòng Đại học",
            notifications: 0,
        },

        {
            id: "2",
            name: "Phòng Sau đại học",
            notifications: 0,
        },

        {
            id: "3",
            name: "Phòng điện toán và máy tính",
            notifications: 0,
        },

        {
            id: "4",
            name: "Phòng khảo thí và kiểm định chất lượng",
            notifications: 0,
        },

        {
            id: "5",
            name: "Phòng tài chính",
            notifications: 0,
        },

        {
            id: "6",
            name: "TDT Creative Language Center",
            notifications: 0,
        },

        {
            id: "7",
            name: "Trung tâm tin học",
            notifications: 0,
        },

        {
            id: "8",
            name: "Trung tâm đào tạo phát triển xã hội (SDTC)",
            notifications: 0,
        },

        {
            id: "9",
            name: "Trung tâm phát triển Khoa học quản lý và Ứng dụng công nghệ (ATEM)",
            notifications: 0,
        },

        {
            id: "10",
            name: "Trung tâm hợp tác doanh nghiệp và cựu sinh viên",
            notifications: 0,
        },

        {
            id: "11",
            name: "Khoa Luật",
            notifications: 0,
        },

        {
            id: "12",
            name: "Trung tâm ngoại ngữ - tin học – bồi dưỡng văn hóa",
            notifications: 0,
        },

        {
            id: "13",
            name: "Viện chính sách kinh tế và kinh doanh",
            notifications: 0,
        },

        {
            id: "14",
            name: "Khoa Mỹ thuật công nghiệp",
            notifications: 0,
        },

        {
            id: "15",
            name: "Khoa Điện – Điện tử",
            notifications: 0,
        },

        {
            id: "16",
            name: "Khoa Công nghệ thông tin",
            notifications: 0,
        },

        {
            id: "17",
            name: "Khoa Quản trị kinh doanh",
            notifications: 0,
        },

        {
            id: "18",
            name: "Khoa Môi trường và bảo hộ lao động",
            notifications: 0,
        },

        {
            id: "19",
            name: "Khoa Lao động công đoàn",
            notifications: 0,
        },

        {
            id: "20",
            name: "Khoa Tài chính ngân hàng",
            notifications: 0,
        },

        {
            id: "21",
            name: "Khoa giáo dục quốc tế",
            notifications: 0,
        },

    ]
    
    return (
        <Menu 
            style={!isMobile?{ width: "15%"} : null}
            mode="inline"
        >
            {groups.map(group => (
                <Menu.Item 
                    key={group.id} 
                    icon={
                        <>
                            <HomeOutlined />
                            <Badge 
                                count={group.notifications} 
                                offset={[0, -10]}
                                size="small"
                                />
                        </>
                    }
                    >
                        <Link to={`/groups/${group.id}`}>
                            {group.name} 
                        </Link>
                        
                </Menu.Item>
            ))}

        </Menu>
    );
}



