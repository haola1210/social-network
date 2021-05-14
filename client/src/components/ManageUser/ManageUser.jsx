import React, { useState, useEffect, } from "react";
import { useSelector, useDispatch, } from "react-redux";
import {
    Button,
    Checkbox,
    Row, 
    Col,
    Modal,
} from 'antd'

import "./ManageUser.scss"
export default function ManageUser (){

    const { socket, } = useSelector(state => state.session)

    const [state, setState] = useState({
        manageUser: [],
        users: [],
        selectedUser: null,
    })
    const { users, manageUser } = state;

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (_id) => {
        setIsModalVisible(true);
        setState(prev => {return{
            ...prev, 
            selectedUser: _id,
        }})
    };

    const handleOk = () => {
        if (state.selectedUser) {
            onDeleteUser(state.selectedUser)
            setState(prev => {return{
                ...prev, 
                selectedUser: null,
            }})
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setState(prev => {return{
            ...prev, 
            selectedUser: null,
        }})
        setIsModalVisible(false);
    };
    
    function onCheckedGroupChange(event) {
        const { checked, value } = event.target;
        setState(prev => {
            return {
                ...prev,
                // manageUser:  checked? [...prev.manageUser, value]
                //     :
                //     [...prev.manageUser.filter(group =>!(group === value))]
                manageUser: checked? [value]: []

            }
        })
        // console.log('checked = ', event);
        // console.log('manageUser ', manageUser);
        // console.log('value = ', manageUser.indexOf(value));
    }

    function openModal(message, secondToGo = 3) {
        
        const modal = Modal.success({
            title: "Thông báo",
            content: message,
        })
        
        const timer = setInterval(() =>{
            secondToGo -= 1;
            // modal.update
        }, 1000)

        setTimeout(() =>{
            clearInterval(timer);
            modal.destroy();
        }, secondToGo * 1000);
    }

    useEffect( () => {
        if (socket) {
            socket.emit("client-get-list-users")
            socket.on("server-send-list-users", ({ list }) => {
                if (list.length > 0) {
                    console.log("admin list user", list)
                    setState(prev => {return{
                        ...prev,
                        users: list,
                    }})
                }
            })
            socket.once("server-send-admin-delete-user", ({ message }) => {
                if (message) openModal(message)
            })

        }
    }, [socket, state.users])

    const ActionButton = ({ _id }) => {
        return (
            <Button 
                style={{marginLeft: "2em"}}
                type="danger" 
                onClick={() => showModal(_id)}
            >Xóa</Button>
        )
    }

    const onDeleteUser = ( _id ) => {
        socket.emit("client-request-admin-delete-user", { _id })
    }

    return (
        <div className="main-admin">
            <div className="main-admin__right">
                <h3 className="main-admin__title">
                    Các Tài khoản phòng ban hoặc Khoa
                </h3>
                <div className="main-admin__right__list">
                { 
                    users.map( user => {
                        return (
                            <div>
                                <Row key={user._id} className="main-admin__right__list__item" >
                                    <Col span={8}>
                                        <Checkbox 
                                            onChange={onCheckedGroupChange}
                                            value={user._id}
                                            checked={manageUser.indexOf(user._id)>=0}
                                        > 
                                            { user.name }{manageUser.indexOf(user._id)>=0 && <ActionButton _id={user._id} />}
                                        </Checkbox>
                                    </Col>
                                    <Col>
                                        <Modal title="Xác nhận" visible={isModalVisible}
                                            footer={[
                                                <Button key="submit" type="danger" onClick={handleOk}>
                                                    Xác nhận
                                                </Button>,
                                                <Button key="back" onClick={handleCancel}>
                                                    Hủy bỏ
                                                </Button>,
                                            ]}>
                                            <p>Bạn có thật sự muốn xóa tại khoản này?</p>
                                        </Modal>
                                    </Col>
                                </Row>
                            </div>

                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}