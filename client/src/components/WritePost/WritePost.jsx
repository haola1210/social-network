import React, { useState, } from "react";
import { Modal, Card, Avatar, Form, Upload, Input } from "antd";
import { ControlOutlined, PlusOutlined } from "@ant-design/icons";
import {
  MAKING_POST,
} from "../../redux/post/postActionType"
import { useSelector, useDispatch } from "react-redux";

import './WritePost.scss'

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

const WritePost = ( props ) => {

	const [visible, setVisible] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [modalText, setModalText] = useState("Content of the modal");
	const { Meta } = Card;
	const dispatch = useDispatch();
	const { currentGroup } = useSelector(state => state.groups)
    const { _id: groupId} = currentGroup
	
	const showModal = () => {
		setVisible(true);
	};

	const handleOk = () => {
		
		setModalText("The modal will be closed after two seconds");
		setConfirmLoading(true);
		setTimeout(async () => {
			
			setVisible(false);
			setConfirmLoading(false);

			const listFiles = await Promise.all([...state.fileList.map(async file => 
				await getBase64(file.originFileObj))])
			const post = {
				content,
				fileList: listFiles,
				belongToGroup: groupId !== "" && groupId !== undefined? groupId : null,
			}
			dispatch({ type: MAKING_POST, payload: post})
		}, 2000);
	};

	const handleCancel = () => {
		// console.log("Clicked cancel button");
		setVisible(false);
	};

	// content section
	const [content, setContent] = useState("");

	// upload section
	const [state, setState] = useState({
		previewVisible: false,
		previewImage: "",
		previewTitle: "",
		fileList: []
	});

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

	const uploadButton = (
		<div>
		<PlusOutlined />
		<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	return (
		<> 
			{/* trigger component */}
		{/* <Button type="primary" onClick={showModal}>
			Open Modal with async logic
		</Button> */}
			<div className="write-post">
				<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
				<div className="write-post__title" onClick={showModal} >
					Có điều gì mới không? :)
				</div>
			</div>

		{/* modal .... */}
			<Modal
			title="Tạo bài viết"
			visible={visible}
			onOk={handleOk}
			confirmLoading={confirmLoading}
			onCancel={handleCancel}
			bodyStyle={{ padding: "1em" }}
			closable={true}
			style={{ top: 30 }}
			>
				<Card style={{ width: "100%" }} bordered={false}>
				<Meta
					avatar={
					<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
					}
					title="Hao Le"
				/>
				<Card.Grid hoverable={false} style={{ width: "100%" }}>
					<Form>
					<Form.Item>
						<Input.TextArea
						placeholder="Viết gì đó..."
						autoSize={{ minRows: 3 }}
						bordered={false}
						onChange={e => setContent(e.target.value)}
						/>
					</Form.Item>

					<Form.Item>
						<Upload
						//action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
						listType="picture-card"
						fileList={state.fileList}
						onPreview={handlePreview}
						onChange={handleChange}
						>
						{uploadButton}
						</Upload>
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
					</Form.Item>
					</Form>
				</Card.Grid>
				</Card>
			</Modal>
		</>
	);
};

export default WritePost;
