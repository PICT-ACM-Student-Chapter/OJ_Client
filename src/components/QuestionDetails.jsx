import React from "react";
import { Typography, Divider, Table, Card, Tabs } from "antd";

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;

const que_desc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Netus et malesuada fames ac turpis egestas integer. Leo a diam sollicitudin tempor id eu nisl nunc. Eget duis at tellus at urna. Id ornare arcu odio ut sem nulla pharetra diam. Rhoncus dolor purus non enim. Suspendisse ultrices gravida dictum fusce ut. Sit amet tellus cras adipiscing enim eu turpis. Sit amet porttitor eget dolor morbi non arcu risus. Mattis vulputate enim nulla aliquet. Ac turpis egestas maecenas pharetra convallis posuere morbi leo. Sit amet justo donec enim diam vulputate ut. Porta nibh venenatis cras sed felis eget velit aliquet. Augue ut lectus arcu bibendum. Nisl rhoncus mattis rhoncus urna neque. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Lobortis feugiat vivamus at augue eget. Turpis massa tincidunt dui ut. Tempus quam pellentesque nec nam aliquam sem et. Tincidunt dui ut ornare lectus.`;
const input_desc = `input description here`;
const output_desc = `ouput description here`;
const constrains_details = `x < 50, 0 < n < 10^9`;

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

function QuestionDetails() {
	return (
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
	);
}

export default QuestionDetails;
