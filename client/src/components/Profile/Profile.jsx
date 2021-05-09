import React, { useState, useEffect, } from 'react'
import { Row, Col, Card, Input, Button, Tooltip, } from 'antd'
import { UploadOutlined, MailOutlined, PhoneOutlined, LockOutlined, HighlightOutlined, } from '@ant-design/icons'

import { useSelector, useDispatch } from "react-redux"

import TopNav from "../TopNav/TopNav"
import { INIT_SOCKET } from "../../socketClient"
import "./Profile.scss"

export default function Profile () {

    const [state, setState] = useState({
        email: "",
        phone: "",
        lastName: "", 
        name: "", 
        image: "",
    })
    const { Meta } = Card;
    const { user, } = useSelector(state => state.session)
    const dispatch = useDispatch()
    
    useEffect(() => {
        console.log("user", user)
    }, [user])

    return(
        <div>
            <TopNav />
            <div className="profile">
                <Card
                    className="profile__left"
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={user.image || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}/>}
                    actions={[
                        <Tooltip title="Đổi Ảnh Đại Diện" placement="bottom">
                            <UploadOutlined key="ellipsis" />
                        </Tooltip>,
                        <Tooltip title="Đổi Mật Khẩu" placement="bottom">
                            <LockOutlined />
                        </Tooltip>,
                    ]}
                >
                    <Meta title={user.lastName + " " + user.firstName} description={user.role} />
                </Card>
                <div className="profile__right">
                    <div style={{
                        display: "flex", 
                        justifyContent: "space-around", 
                        alignItems: "center",
                    }}>
                        CHI TIẾT THÔNG TIN CÁ NHÂN
                    </div>
                    <div style={{
                        // display: "flex",
                    }}
                    >
                        
                    </div>
                    <Row>
                        <Col className="gutter-row" span={32}>
                            <div>
                                <Input placeholder="Nhập email" prefix={"Email"} value={user.email} />
                            </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <Button type="primary" icon={<MailOutlined />} > Thay đổi</Button>
                        </Col>
                    </Row> 
                    {/* 
                    <Row >
                        <Col className="gutter-row" span={32}>
                            <div>
                                <Input placeholder="Nhập số điện thoại" prefix={"Số điện thoại"} />
                            </div>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <Button type="primary" icon={<PhoneOutlined />} > Thay đổi</Button>
                        </Col> 
                    </Row>
                    */}
                    <Row >
                        <Col className="gutter-row" span={18}>
                            <div>
                                <Input placeholder="Nhập Họ" prefix={"Họ"} value={user.lastName} />
                            </div>
                        </Col>
                        <Col className="gutter-row" span={18}>
                            <div>
                                <Input placeholder="Nhập Tên" prefix={"Tên"} value={user.firstName}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col><Button type="success" icon={<HighlightOutlined />} > Thay đổi</Button></Col>
                        <Col><Button type="primary" icon={<PhoneOutlined />} > Thay đổi</Button></Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}