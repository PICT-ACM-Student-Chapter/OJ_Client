import React from "react";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import { PageHeader, Button, Descriptions, Typography, Tabs } from "antd";

function QuestionHeader() {
	return (
		<div
			style={{
				border: "1px solid #303030",
			}}
		>
			<PageHeader
				ghost={false}
				title="A. Let's Crack it."
				extra={[
					<Button key="3">
						<CaretLeftFilled />
						Prev Problem
					</Button>,
					<Button key="2">
						Next Problem
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
