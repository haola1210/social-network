import React, { useState } from 'react';
import { Card, Avatar, Typography, Carousel, Image } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  CommentOutlined
} from "@ant-design/icons";

import CommentContainer from "../CommentContainer/CommentContainer";

const { Meta } = Card;
const { Paragraph } = Typography;

function NewFeedPost(props) {

    const [showComment, setShowComment] = useState(false);

    return (
        <div style={{ width: "100%", margin: "1em 0" }}>
            <Card
                style={{ width: "100%" }}
                actions={[
                <LikeOutlined />, //dispatch like here
                <DislikeOutlined />,
                <CommentOutlined onClick={() => setShowComment((prev) => !prev)} />
                ]}
            >
                <Meta
                avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Hao Le"
                style={{ padding: "1em" }}
                />
                {/* content */}
                <Card.Grid style={{ width: "100%" }} hoverable={false}>
                <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }}>
                    Hao dep trai vkl, qua pro vip dinh cua dinh. Sau day la mot vai hinh
                    anh nghe thuat cua Hao chup. Hmm phan nay se bi anh di vi dai hon 4
                    dong. Co ve vai dong nua moi du 4 dong. au hahahahah jashdasdhi
                    asoikdhasdjhksakjd askjdasjkdhjkasdhjk dhaskjdkhjasdkj
                </Paragraph>

                <Carousel>
                    <Image
                    style={{ width: "100%" }}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    <Image
                    style={{ width: "100%" }}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    <Image
                    style={{ width: "100%" }}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    <Image
                    style={{ width: "100%" }}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    <Image
                    style={{ width: "100%" }}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    <Image
                    style={{ width: "100%" }}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                </Carousel>
                </Card.Grid>
            </Card>

            {/* comment container*/}
            {showComment && <CommentContainer />}
        </div>
  
    );
}

export default NewFeedPost;