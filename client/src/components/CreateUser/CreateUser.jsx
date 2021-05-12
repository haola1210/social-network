import React, { useState, useEffect, } from "react";
import { useSelector, useDispatch, } from "react-redux";
import {
    Form,
    Input,
    Button,
    Checkbox,
    Row, 
    Col,
    Modal,
    Radio,
} from 'antd'
import {
    UserOutlined, 
    LockOutlined,
} from '@ant-design/icons'
import axios from "axios"

import "./CreateUser.scss"
export default function CreateUser (){

    const dispatch = useDispatch();
    const { Group: RadioGroup, Button: RadioButton, } = Radio;

    const [state, setState] = useState({
        username: "",
        password: "",
        manageGroup: [],
        groups: [],
    })
    const { groups, manageGroup } = state;

    const initialValues = {
        remember: state.remember,
        username: state.remember? state.username : "",
        password: state.remember? state.password : "",
    }

    const onFieldsChange = (changedFields, allFields) => {
        changedFields.forEach(field => {
            setState(prev=>{return{
                ...prev,
                [`${field.name[0]}`]: field.value
            }})
        })
    }

    const onFinish = async (values) => {

        let { submit, ...user } = values;
        user = {...user, manageGroup }

        const response = await axios.post ("http://localhost:4000/users/", user)
        
        if (response.data.code === 200) {
            openModal("Tạo người dùng mới thành công.");
        }
        else {
            openModal("Tạo người dùng mới thất bại.")
        }
    };
    
    const onFinishFailed = ({ values, errorFields, outOfDate }) => {
        console.log('Failed: errorInfo');
        console.log({ values, errorFields, outOfDate });
    };

    function onCheckedGroupChange(event) {
        const { checked, value } = event.target;
        setState(prev => {
            return {
                ...prev,
                manageGroup:  checked? [...prev.manageGroup, value]
                    :
                    [...prev.manageGroup.filter(group =>!(group === value))]

            }
        })
        console.log('checked = ', event);
        console.log('manageGroup ', manageGroup);
        console.log('value = ', manageGroup.indexOf(value));
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
        axios.get("http://localhost:4000/groups/").then(response => {
            if (response.data.code === 200) {
                if (response.data.data !== state.groups)
                {
                    setState(prev => {
                        return {
                            ...prev,
                            groups : response.data.data.map(group => {
                                return {
                                    _id: group._id,
                                    name: group.name,
                                }
                            }),
                        }
                    })
                    console.log("test")
                }
            }
            else {console.log(response.data.error)}
        })
    }, [])
    
    return (
        <div className="main-admin">
            <div className="main-admin__left">
                <h3 className="main-admin__title">
                    Create new user
                </h3>
                <div >
                    <Form
                        initialValues={{...initialValues}}
                        onFieldsChange={onFieldsChange}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên người dùng!',
                            },
                            ]}
                        >
                            <Input 
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                value = {state.username}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên đăng nhập người dùng!',
                            },
                            ]}
                        >
                            <Input 
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                value = {state.username}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                            {
                                required: true,
                                type: 'string', 
                                message: 'Vui lòng nhập mật khẩu!',
                                min: 3,
                                max: 20,
                            },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}/>
                        </Form.Item>

                        <div className="login-form__body-action">
                                {/* <div className="login-form__body-action-remember">
                                    <Form.Item 
                                        name="remember" 
                                        valuePropName="checked"
                                    >
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                </div> */}
                                {/* <div className="login-form__body-action-forgotPassword">
                                    <p>
                                        <Link to="/forgot">Forgot password</Link>
                                    </p>
                                </div> */}
                                <small style={{padding: "0.5em"}}>Remeber to select group for new user!</small>
                                <div className="login-form__body-action-submit">                               
                                    {/* <Form.Item>
                                        <RadioGroup>
                                            <Radiobutton value=""></Radiobutton>
                                        </RadioGroup>
                                    </Form.Item> */}
                                    <Form.Item name="submit">
                                        <Button type="primary" htmlType="submit">
                                            Create
                                        </Button>
                                    </Form.Item>
                                </div>
                                
                            </div>
                    </Form>
                </div>
            </div>
            <div className="main-admin__right">
                <h3 className="main-admin__title">
                    Select group(s) for your new user
                </h3>
                <div className="main-admin__right__list">
                { 
                    groups.map( group => {
                        // console.log("manage group ", group)

                        return (
                            <Row key={group._id} className="main-admin__right__list__item" >
                                <Col span={8}>
                                    <Checkbox 
                                        onChange={onCheckedGroupChange}
                                        value={group._id}
                                        checked={manageGroup.indexOf(group._id)>=0}
                                        > 
                                        { group.name } 
                                    </Checkbox>
                                </Col>
                            </Row>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}