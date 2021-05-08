import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux"

import { List, Form, Input, Button, Skeleton, Row, Col } from "antd";

import CustomComment from "../CustomComment/CustomComment";

function CommentContainer({ containerState }) {
		
	const { socket, user, } = useSelector(state => state.session)
	const [ state, setState ] = useState({
		content: "", 
		belongToPost: containerState.postId,
	})
	
	const onComment = () => {
		console.log("onComment", containerState)
		console.log("state", state)
		socket.emit("client-comment-post", { 
			owner: user._id, 
			content: state.content, 
			belongToPost: state.belongToPost, 
		})
		setState(prev => {return{
			...prev, 
			content: "",
		}})
		socket.on("server-send-comment-post", ({ error, comment, belongToPost}) => {
			console.log({ error, comment, belongToPost})
		})
	}

    const onFieldsChange = (changedFields, allFields) => {
        changedFields.forEach(field => {
            setState(prev=>{return{
                ...prev,
                [`${field.name[0]}`]: field.value
            }})
        })
    }

	const footer = (
		<Form 
			style={{ width: "100%" }}
			onFieldsChange={onFieldsChange}
		>
		<Row>
			{!containerState.loading && containerState.isShow ? (
			<Button
				style={{
				margin: "10px 0",
				border: "none",
				outline: "none",
				padding: 0
				}}
			>
				loading more
			</Button>
			) : null}
		</Row>
		<Row>
			<Col flex="4">
			<Form.Item
				name="content"
				value={state.content}
				rules={[{ required: true, message: "Please input your comment" }]}
			>
				<Input.TextArea
				autoSize={{ minRows: 1, maxRows: 2 }}
				placeholder="Type your comment here! :)"
				/>
			</Form.Item>
			</Col>
	
			<Col flex="1">
			<Form.Item>
				<Button type="primary" htmlType="submit" onClick={onComment}>
				Comment
				</Button>
			</Form.Item>
			</Col>
		</Row>
		</Form>
	);

	useEffect(() =>{
		console.log("containerState", containerState)
		console.log("state", state)
		console.log("user", user)
	}, [ state, containerState ])

	return (
	<>
		{containerState.error && <p>Error: {containerState.error}</p>}
		<List
			style={{backgroundColor: "white", padding: "0 1em 0 1em"}}
			className="demo-loadmore-list"
			loading={containerState.loading} //state.initLoading
			itemLayout="horizontal"
			footer={footer}
			dataSource={containerState.comments} //state.list
			renderItem={(item) => (
				<List.Item>
					<CustomComment data={item}/>
				</List.Item>
			)}
		/>
	</>
	);
}

export default CommentContainer;