import React from 'react';
import { List, Form, Input, Button, Skeleton, Row, Col } from "antd";

import CustomComment from "../CustomComment/CustomComment";

const initialState = {
    initLoading: false,
    loading: false,
    data: [1, 1, 1, 1, 1],
    list: [1, 1, 1, 1, 1]
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "init_data_start":
        return {
          ...state,
          initLoading: true
        };
  
      case "init_data_success":
        return {
          ...state,
          initLoading: false,
          data: [...state.data, ...action.payload.comments],
          list: [...state.list, ...action.payload.comments]
        };
  
      case "init_data_failure":
        // push notification in req failure -> antd message
        return {
          ...state,
          initLoading: false
        };
  
      case "more_data_start":
        //add more 3 temp comments with loading state (skeleton antd)
        let data = [...new Array(3)].map(() => ({ loading: true, data: {} }));
  
        return {
          ...state,
          initLoading: false,
          loading: true,
          list: [...state.list, ...data]
        };
  
      case "more_data_success":
        return {
          ...state,
          loading: false,
          list: [...state.list, ...action.payload.comments],
          data: [...state.data, ...action.payload.comments]
        };
  
      case "more_data_failure":
        //push notification in req failure -> antd message
        return {
          ...state,
          initLoading: false,
          loading: false
        };
  
      default:
        return state;
    }
  };
  
  // reducer above will be add to redux soon


function CommentContainer(props) {

    const state = {}

    const footer = (
        <Form style={{ width: "100%" }}>
          <Row>
            {!state.initLoading && !state.loading ? (
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
                name="commentContent"
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
                <Button type="primary" htmlType="submit">
                  Comment
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      );

    return (
        <List
            style={{backgroundColor: "white", padding: "0 1em 0 1em"}}
            className="demo-loadmore-list"
            loading={false} //state.initLoading
            itemLayout="horizontal"
            footer={footer}
            dataSource={[1,1,1,1,1,1]} //state.list
            renderItem={(item) => (
                <List.Item>
                    <CustomComment />
                </List.Item>
            )}
        />
    );
}

export default CommentContainer;