import React, { useState, useEffect } from 'react';
import {
    Link,
    useHistory
} from 'react-router-dom'
import {
    Form,
    Input,
    Button,
    Checkbox,
    Layout,
} from 'antd'
import {
    DeploymentUnitOutlined,
    UserOutlined, 
    LockOutlined,
} from '@ant-design/icons'
import 'antd/dist/antd.css';
import './Login.scss'

const { Header, Footer, Sider, Content } = Layout;

export default function Login() {
    
    const history = useHistory();

    const [state, setState] = useState({
        remember: true,
        username: "qwe@gmail.com",
        password: "123",

    })

    const initialValues = {
        remember: state.remember,
        username: state.remember? state.username : "",
        password: state.password? state.password : "",
    }

    const onFieldsChange = (changedFields, allFields) => {
        changedFields.forEach(field => {
            setState(prev=>{return{
                ...prev,
                [`${field.name[0]}`]: field.value
            }})
        })
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        // api here 
        // ...
        history.push("/")
    };
    
    const onFinishFailed = ({ values, errorFields, outOfDate }) => {
        console.log('Failed: errorInfo');
        console.log({ values, errorFields, outOfDate });
    };
    
    useEffect(() =>{

    },[])
    return (
        <div className="login-page">
            <Layout>
                <Header>
                    <div className="login-page__header">
                        <div className="login-page__header-icon">
                            <DeploymentUnitOutlined spin={false}/>
                        </div>
                        <div className="login-page__header-text">
                            <h4>Login</h4>
                        </div>
                    </div>
                </Header>
                <Content>
                    <div className="login-page__body">
                    
                        <div className="login-form">
                            
                            <div className="login-form__body">
                                <Form
                                    initialValues={{...initialValues}}
                                    onFieldsChange={onFieldsChange}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                >
                                    <Form.Item
                                        label="Username"
                                        name="username"
                                        rules={[
                                        {
                                            required: true,
                                            type: "email",
                                            message: 'Please input your Username!',
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
                                            message: 'Please input your Password!',
                                            min: 3,
                                            max: 20,
                                        },
                                        ]}
                                    >
                                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}/>
                                    </Form.Item>

                                    <div className="login-form__body-action">

                                            <div className="login-form__body-action-remember">
                                                <Form.Item 
                                                    name="remember" 
                                                    valuePropName="checked"
                                                >
                                                    <Checkbox>Remember me</Checkbox>
                                                </Form.Item>
                                            </div>
                                            <div className="login-form__body-action-submit">                               
                                                <Form.Item name="submit">
                                                    <Button type="primary" htmlType="submit">
                                                        Submit
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                            <div className="login-form__body-action-forgotPassword">
                                                <p>
                                                    <Link to="/forgot">Forgot password</Link>
                                                </p>
                                            </div>
                                        </div>
                                </Form>
                            </div>
                            <div className="login-form__footer">
                                <p className="login-form__footer-action">
                                    <Link to="/register">Register now</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </Content>
                <Footer>
                    <div className="login-page__footer">
                        <p> Social Network © 2021 </p>
                    </div>
                </Footer>
            </Layout>
        </div>
    )
}