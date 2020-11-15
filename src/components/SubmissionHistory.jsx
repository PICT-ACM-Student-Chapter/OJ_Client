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

const submHistoryData = [
	{
		key: "1",
		Time_Submitted: "19:05",
		Submission_ID: "PZ100293094",
		Status: "Accepted",
		Runtime: "23ms",
		Memory: "13kb",
		Language: "cpp",
	},
	{
		key: "1",
		Time_Submitted: "19:05",
		Submission_ID: "PZ100293094",
		Status: "Accepted",
		Runtime: "23ms",
		Memory: "13kb",
		Language: "cpp",
	},
	{
		key: "1",
		Time_Submitted: "19:05",
		Submission_ID: "PZ100293094",
		Status: "Accepted",
		Runtime: "23ms",
		Memory: "13kb",
		Language: "cpp",
	},
];

function SubmissionHistory() {
	return (
		<div>
			<Title level={5}>SUBMISSION HISTORY</Title>
			<Table
				columns={submHistoryCol}
				dataSource={submHistoryData}
				pagination={false}
				size="small"
			/>
		</div>
	);
}

export default SubmissionHistory;
