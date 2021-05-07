import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux"

import { List, Form, Input, Button, Skeleton, Row, Col } from "antd";

import CustomComment from "../CustomComment/CustomComment";

function CommentContainer({ containerState }) {

    
    
    

    const footer = (
        <Form style={{ width: "100%" }}>
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
                      <CustomComment />
                  </List.Item>
              )}
          />
      </>
    );
}

export default CommentContainer;