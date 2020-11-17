import React from "react";

import { CheckCircleOutlined } from "@ant-design/icons";
import { Table, Tag, Typography } from "antd";
const { Title } = Typography;

// submission history
const submHistoryCol = [
	{
		title: "Time Submitted",
		dataIndex: "Time_Submitted",
		key: "Time Submitted",
	},
	{
		title: "Submission ID",
		dataIndex: "Submission_ID",
		key: "Submission ID",
	},
	{
		title: "Status",
		dataIndex: "Status",
		key: "Status",
		render: (Status) => {
			return (
				<Tag icon={<CheckCircleOutlined />} color="success">
					success
				</Tag>
			);
		},
	},
	{
		title: "Runtime",
		dataIndex: "Runtime",
		key: "Runtime",
	},
	{
		title: "Memory",
		dataIndex: "Memory",
		key: "Memory",
	},
	{
		title: "Language",
		dataIndex: "Language",
		key: "Language",
	},
];

function SubmissionHistory(props) {
	return (
		<div>
			<Title level={5}>SUBMISSION HISTORY</Title>
			<Table
				columns={submHistoryCol}
				dataSource={props.submHistoryData}
				pagination={false}
				size="small"
			/>
		</div>
	);
}

export default SubmissionHistory;
