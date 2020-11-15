import React from "react";
import SplitPane from "react-split-pane";
import {
	CaretLeftFilled,
	CaretRightFilled,
	PlayCircleOutlined,
	SendOutlined,
	CheckCircleOutlined,
	UploadOutlined,
	BarsOutlined,
	AlignLeftOutlined,
} from "@ant-design/icons";
import {
	PageHeader,
	Button,
	Descriptions,
	Typography,
	Divider,
	Table,
	Space,
	Tag,
	Card,
	Tabs,
} from "antd";

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;

const que_desc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Netus et malesuada fames ac turpis egestas integer. Leo a diam sollicitudin tempor id eu nisl nunc. Eget duis at tellus at urna. Id ornare arcu odio ut sem nulla pharetra diam. Rhoncus dolor purus non enim. Suspendisse ultrices gravida dictum fusce ut. Sit amet tellus cras adipiscing enim eu turpis. Sit amet porttitor eget dolor morbi non arcu risus. Mattis vulputate enim nulla aliquet. Ac turpis egestas maecenas pharetra convallis posuere morbi leo. Sit amet justo donec enim diam vulputate ut. Porta nibh venenatis cras sed felis eget velit aliquet. Augue ut lectus arcu bibendum. Nisl rhoncus mattis rhoncus urna neque. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Lobortis feugiat vivamus at augue eget. Turpis massa tincidunt dui ut. Tempus quam pellentesque nec nam aliquam sem et. Tincidunt dui ut ornare lectus.`;
const input_desc = `input description here`;
const output_desc = `ouput description here`;
const constrains_details = `x < 50, 0 < n < 10^9`;

// styling for split pane
const splitPaneStyles = {
	background: "#adadb1",
	width: "4px",
	cursor: "col-resize",
	height: "100%",
};

// testcases data - to be provided in tabular form
const testCaseColumns = [
	{
		title: "Number",
		dataIndex: "Number",
		key: "Number",
	},
	{
		title: "Input",
		dataIndex: "Input",
		key: "Input",
	},
	{
		title: "Output",
		dataIndex: "Output",
		key: "Output",
	},
];

const testCaseData = [
	{
		key: "1",
		Number: 1,
		Input: "6 1 2 2 3 4 5 6",
		Output: "6",
	},
	{
		key: "1",
		Number: 2,
		Input: "6 1 2 2 3 4 5 6",
		Output: "6",
	},
	{
		key: "1",
		Number: 3,
		Input: "6 1 2 2 3 4 5 6",
		Output: "6",
	},
	{
		key: "4",
		Number: 3,
		Input: "6 1 2 2 3 4 5 6",
		Output: "6",
	},
	{
		key: "5",
		Number: 3,
		Input: "6 1 2 2 3 4 5 6",
		Output: "6",
	},
];

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

function QuestionPage() {
	return (
		<div>
			<SplitPane
				split="vertical"
				minSize={200}
				defaultSize={450}
				maxSize={1000}
				resizerStyle={splitPaneStyles}
				primary="second"
			>
				<div
					style={{
						height: "95vh",
						overflow: "auto",
						margin: "1.5rem",
						marginBottom: "50px",
					}}
				>
					<Tabs type="card">
						<TabPane tab="Problem" key="1">
							<div>
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
											<Descriptions.Item label="Time Limit">
												1 sec
											</Descriptions.Item>
											<Descriptions.Item label="Memory Limit">
												50000 Bytes
											</Descriptions.Item>
										</Descriptions>
									</PageHeader>
								</div>

								<div>
									<Card
										style={{
											margin: "1rem 0 0",
										}}
									>
										<Typography style={{ textAlign: "left", padding: "1rem" }}>
											<Title level={5}>DESCRIPTION</Title>
											<Paragraph>{que_desc}</Paragraph>

											<Divider style={{ background: "#616161" }} />
											<Title level={5}>INPUT</Title>
											<Paragraph>
												{input_desc}
												<div>
													<Title level={5}>constrains:</Title>
													<Paragraph>{constrains_details}</Paragraph>
												</div>
											</Paragraph>

											<Divider style={{ background: "#616161" }} />

											<Title level={5}>OUTPUT</Title>
											<Paragraph>{output_desc}</Paragraph>

											<Divider style={{ background: "#616161" }} />

											<Title level={5}>TESTCASES</Title>
											<Table
												columns={testCaseColumns}
												dataSource={testCaseData}
												size="small"
												pagination={false}
											/>
										</Typography>
									</Card>
								</div>
							</div>
						</TabPane>
						<TabPane tab="Submissions" key="2">
							<Title level={5}>SUBMISSION HISTORY</Title>
							<Table
								columns={submHistoryCol}
								dataSource={submHistoryData}
								pagination={false}
								size="small"
							/>
						</TabPane>
					</Tabs>
				</div>
				<div style={{ height: "100%", background: "#616161" }}>
					<div
						style={{
							position: "fixed",
							right: "0",
							bottom: "0",
							width: "100%",
							height: "50px",
							padding: "0 24px",
							lineHeight: "50px",
							background: "#000",
							borderTop: "1px solid #303030",
						}}
					>
						<div style={{ float: "left" }}>
							<Space>
								<Button icon={<BarsOutlined />}>All Problems</Button>
							</Space>
						</div>
						<div style={{ float: "right" }}>
							<Space>
								<Button icon={<UploadOutlined />}>Upload from Device</Button>
								<Button icon={<AlignLeftOutlined />}>Custom Input</Button>
								<Button>
									RUN
									<PlayCircleOutlined />
								</Button>
								<Button type="primary">
									SUBMIT
									<SendOutlined />
								</Button>
							</Space>
						</div>
					</div>
				</div>
			</SplitPane>
		</div>
	);
}

export default QuestionPage;
