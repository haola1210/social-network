import React, { useState, useEffect, } from 'react'
import { 
    Row, 
    Col, 
    Card, 
    Input, 
    Button, 
    Tooltip, 
    Modal, 
    Avatar, 
    Form, 
    Upload,
    message ,
} from 'antd'
import { 
    UploadOutlined, 
    PlusOutlined, 
    PhoneOutlined, 
    LockOutlined, 
    HighlightOutlined, 
    EyeTwoTone,
    EyeInvisibleOutlined,
} from '@ant-design/icons'

import { useSelector, useDispatch } from "react-redux"

import TopNav from "../TopNav/TopNav"
import { UPLOAD_IMAGE } from "../../socketClient"
import "./Profile.scss"

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

export default function Profile () {

    const [uploadModalVisible, setUploadModalVisible] = useState(false);
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);
	const [confirmUploadImageLoading, setConfirmUploadImageLoading] = useState(false);
    const [state, setState] = useState({
        _id: "",
        email: "",
        name: "", 
        password: "", 
        newPassword: "", 
        image: "",
        fileList: [],
        previewVisible: false,
		previewImage: "",
		previewTitle: "",
    })
    const key = 'updatable';

    const { Meta } = Card;
    const { user, socket, } = useSelector(state => state.session)
    const dispatch = useDispatch()

    const uploadImageToSocket = ( _id, name, image ) => {
                    
        const updateProfile = {
            _id,
            name,
            image: image,

        }
        if(socket) {
            socket.emit("client-upload-image", updateProfile)
        }else onMessage("Tải ảnh lên server lỗi vì mất kết nối")
    }

	const handleUploadModalOk = () => {
		
		setConfirmUploadImageLoading(true);
		setTimeout(async () => {
            
            onProccessing()
            const image = state.fileList[state.fileList.length - 1]
            if (image !== null && image !== undefined) {
                const uploadImage = await getBase64(image.originFileObj)
                uploadImageToSocket( user._id, user.name, uploadImage );

            } else if (!state.fileList.length) {
                uploadImageToSocket( user._id, user.name, null );

            } else onMessage("Tải ảnh không tồn tại")
			setUploadModalVisible(false);
			setConfirmUploadImageLoading(false);

		}, 2000);
	};

	const handleUploadModalCancel = () => {
		setUploadModalVisible(false);
	};
    
    const handleChangePasswordOk = () => {
        
        const { password, newPassword } = state
        onProccessing()
        if (password !== "" && newPassword !== "") {
            const updateProfile = { 
                _id: user._id,
                newPassword,
                password,
            } 
            if(socket) {
                socket.emit("client-change-profile-password", updateProfile)
            } else onMessage("Kết nối server lỗi vì mất kết nối")
        } else onMessage("Vui lòng nhập mật khẩu hay mặt khẩu mới")

        setChangePasswordVisible(false);
    };
    
    const handleChangePasswordCancel = () => {
        setChangePasswordVisible(false);
    };
    
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
		}

		setState({
            ...state,
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle:
                file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
		});
	};

	const handleChange = ({ fileList }) => setState({ ...state, fileList });

	const uploadButton = (<div>
		<PlusOutlined />
		<div style={{ marginTop: 8 }}>Upload</div>
    </div>);

    const onUploadImage = () => {
        // console.log("onUploadImage")
		setUploadModalVisible(true)
    }

    const onChangePassword = () => {
        // console.log("onChangePassword")
        setChangePasswordVisible(true)
    }

    const onProccessing = () => {
        message.loading({ content: 'Đang xử lý ...', key });
    }
    const onMessage = ( announcement ) => {
        message.success({ content: announcement, key, duration: 2 });
    };

    useEffect(() => {
        if (user) {
            // console.log("user", user)
            setState(prev => {return {
                ...prev, 
                _id: user._id,
                email: user.email,
                name: user.name,
                image: user.image,
                fileList: user.image !== null && user.image !== undefined ?[
                    {
                        uid: '0',
                        name: `${user._id}_avatar.png`,
                        status: 'done',
                        url: user.image || "",
                    }
                ]:[],
            }})
        }
        if (socket) {
            socket.once("server-send-upload-image", ( data ) => {
                if ( data.error ) {
                    console.log("server-send-upload-image ERROR ", data.error.message)
                    onMessage("Cập nhật ảnh đại diện thất bại")
                } else if ( data.user._id === user._id) {
                    // console.log("server-send-upload-image", data.user)
                    dispatch({ type: UPLOAD_IMAGE, payload: { user: data.user }})
                    onMessage("Cập nhật ảnh đại diện thành công")
                }
                
            })
            socket.once("server-send-change-profile-password", ( data ) => {
                console.log(data)
                if ( data.user._id === user._id ) {
                    onMessage("Cập nhật mật khẩu thành công")
                }
                if (data.error) {
                    console.log("erver-send-change-profile-password", data.error.message)
                    onMessage("Cập nhật mật khẩu thất bại")
                }
            })
        }
    }, [user])

    return(
        <>
            <TopNav />
            <div className="profile">
                <div
                    className="profile__header" 
                    style={{
                        display: "flex", 
                        justifyContent: "space-around", 
                        alignItems: "center",
                }}> CHI TIẾT THÔNG TIN CÁ NHÂN </div>

                <div className="profile__title">
                    <Card
                        hoverable
                        // https://ui-avatars.com/
                        // cover={<img alt="example" src={user.image || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"} className="profile__image"/>}
                        // image size = 400 in url
                        cover={<img alt="example" src={user.image || `https://ui-avatars.com/api/?background=random&size=400&name=${user.name.split(" ").join("+")}`} className="profile__image"/>}
                        actions={[
                            <Tooltip title="Đổi Ảnh Đại Diện" placement="bottom">
                                <UploadOutlined key="ellipsis" onClick={onUploadImage} />
                            </Tooltip>,
                            <Tooltip title="Đổi Mật Khẩu" placement="bottom">
                                <LockOutlined onClick={onChangePassword} />
                            </Tooltip>,
                        ]}
                    >
                        <Meta title={user.name} description={`Role: ${user.role}`} style={{ textAlign: "center"}} />
                    </Card>
                </div>

                <div className="profile__body">
                    <Row>
                        <Col span={24}>
                            <Input placeholder="Nhập email" prefix={"Email"} value={state.email} readOnly={true}/>
                        </Col>
                    </Row> 
                    <Row >
                        <Col span={24}>
                            <Input placeholder="Nhập Họ và tên" prefix={"Họ và tên"} value={state.name} 
                                readOnly={user.role === "student"} onChange={(e)=>setState(prev=>{return{...prev, name: e.target.value}})}/>
                        </Col>
                    </Row>
                    {/* <Row className="profile__action" >
                        <Col><Button type="success" icon={<HighlightOutlined />} > Thay đổi</Button></Col>
                        <Col><Button type="primary" icon={<PhoneOutlined />} > Thay đổi</Button></Col>
                    </Row> */}
                </div>
            </div>

            {/* Modal upload image */}
            <Modal 
                title="Thay đổi ảnh đại diện"
                visible={uploadModalVisible}
                closable={true}
                onOk={handleUploadModalOk}
                confirmLoading={confirmUploadImageLoading}
                onCancel={handleUploadModalCancel}
                bodyStyle={{ padding: "1em" }}
                style={{ top: 30 }}
                >
                <Meta
                        avatar={ <Avatar src={user.image} /> }
                        title={ user.name }
                    />
                    <Card.Grid hoverable={false} style={{ width: "100%" }}>
                        <Form>
                            <Form.Item>
                                <Upload
                                    listType="picture-card"
                                    fileList={state.fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                >
                                {state.fileList.length >= 2 ? null : uploadButton}
                                </Upload>
                            </Form.Item>
                            <Modal
                                visible={state.previewVisible}
                                title={state.previewTitle}
                                footer={null}
                                onCancel={() => setState({ ...state, previewVisible: false })}
                            >
                                <img
                                    alt="example"
                                    style={{ width: "100%" }}
                                    src={state.previewImage}
                                />
                            </Modal>
                        </Form>
                    </Card.Grid>
            </Modal>
            {/* Modal changed password */}
            {user.role !== "student" && 
                <Modal title="Thay đổi mật khẩu" visible={changePasswordVisible}onCancel={handleChangePasswordCancel}  onOk={handleChangePasswordOk} >
                    <Input.Password
                        placeholder="Nhập mật khẩu hiện tại"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        value={state.password}
                        onChange={(e)=>setState(prev=>{return{...prev, password: e.target.value}})}
                        />
                    <Input.Password
                        placeholder="Nhập mật khẩu mới"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        value={state.newPassword}
                        onChange={(e)=>setState(prev=>{return{...prev, newPassword: e.target.value}})}
                        />
                </Modal>
            }
        </>
    )
}