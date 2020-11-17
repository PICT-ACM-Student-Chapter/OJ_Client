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
					<Button key="1">
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
					{props.otherDetails.map((item) => {
						return (
							<Descriptions.Item label={item.name} key={item.name}>
								{item.val}
							</Descriptions.Item>
						);
					})}
				</Descriptions>
			</PageHeader>
		</div>
	);
}

export default QuestionHeader;
