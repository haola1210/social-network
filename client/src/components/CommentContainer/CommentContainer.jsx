import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux"

import { List, Form, Input, Button, Skeleton, Row, Col } from "antd";

import CustomComment from "../CustomComment/CustomComment";
import { COMMENT_POST } from "../../redux/post/postActionType"

function CommentContainer({ containerState, setContainerState }) {
		
	const { socket, user, } = useSelector(state => state.session)
	const { posts, } = useSelector(state => state.posts)
	const [ comment, setComment ] = useState({
		content: "", 
		belongToPost: containerState.postId,
	})
	const [ listComments, setListComments ] = useState([])
	const dispatch = useDispatch()

	const onComment = () => {
		console.log("onComment", containerState)
		console.log("comment", comment)
		if (comment.content) {
			socket.emit("client-comment-post", { 
				owner: user._id, 
				content: comment.content, 
				belongToPost: comment.belongToPost, 
			})
			setComment(prev => {return{
				...prev, 
				content: "",
			}})
		}
	}

    const onFieldsChange = (changedFields, allFields) => {
        changedFields.forEach(field => {
            setComment(prev=>{return{
                ...prev,
                [`${field.name[0]}`]: field.value
            }})
        })
    }

	const onLoadMore = () => {
		let moreComments = containerState.comments.filter(comment => !listComments.includes(comment))
		
		// loading some part of list
		moreComments = listComments.length >= moreComments.length ? moreComments.slice() : moreComments.slice(-moreComments.length/2)
		
		setListComments([ ...moreComments, ...listComments,  ])
	}

	const onCollapseList = () => {
		setListComments([...containerState.comments.slice(-2)])
	}

	const footer = (
		<Form 
			style={{ width: "100%" }}
			onFieldsChange={onFieldsChange}
		>
		<Row>
			{!containerState.loading && containerState.isShow ? listComments.length < containerState.comments.length ?(
			<Button
				style={{
				margin: "10px 0",
				border: "none",
				outline: "none",
				padding: 0
				}}
				onClick={onLoadMore}
			>
				loading more
			</Button>
			) : (<Button
				style={{
				margin: "10px 0",
				border: "none",
				outline: "none",
				padding: 0
				}}
				onClick={onCollapseList}
			>
				collapse comments
			</Button>
			) : null}
		</Row>
		<Row>
			<Col flex="4">
			<Form.Item
				name="content"
				value={comment.content}
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
				<Button type="primary" htmlType="button" onClick={onComment}>
				Comment
				</Button>
			</Form.Item>
			</Col>
		</Row>
		</Form>
	);

	useEffect(() => {
		setListComments([...containerState.comments.slice(-2)])
	}, [ containerState ])

	// useEffect(() => {
	// 	console.log([ ...containerState.comments.filter(comment => !listComments.includes(comment)).splice(2) ])
	// }, [ listComments ])

	return (
	<>
		{containerState.error && <p>Error: {containerState.error}</p>}
		<List
			style={{backgroundColor: "white", padding: "0 1em 0 1em"}}
			className="demo-loadmore-list"
			loading={containerState.loading} //state.initLoading
			itemLayout="horizontal"
			footer={footer}
			dataSource={listComments} //state.list
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