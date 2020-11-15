import React from "react";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import { PageHeader, Button, Descriptions } from "antd";

function QuestionHeader(props) {
	return (
		<div
			style={{
				border: "1px solid #303030",
			}}
		>
			<PageHeader
				ghost={false}
				title={props.title}
				extra={[
					<Button key="3">
						<CaretLeftFilled />
						<a>Prev Problem</a>
					</Button>,
					<Button key="2">
						<a>Next Problem</a>
						<CaretRightFilled />
					</Button>,
				]}
				size="medium"
			>
				<Descriptions size="small" column={1}>
					<Descriptions.Item label="Time Limit">1 sec</Descriptions.Item>
					<Descriptions.Item label="Memory Limit">
						50000 Bytes
					</Descriptions.Item>
				</Descriptions>
			</PageHeader>
		</div>
	);
}

export default QuestionHeader;
