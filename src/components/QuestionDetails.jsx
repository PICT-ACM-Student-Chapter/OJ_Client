import React from "react";
import { Typography, Divider, Table, Card } from "antd";
import ParaWithTextSimple from "./ParaWithTextSimple";

const { Title, Paragraph } = Typography;

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

function QuestionDetails(props) {
	const que_desc = props.questionDescription;
	const input_desc = props.inputDescription;
	const output_desc = props.outputDescription;
	const constrains_desc = props.contrainsDescription;
	const testCaseData = props.testcases;

	return (
		<div>
			<Card>
				<Typography style={{ textAlign: "left", padding: "1rem" }}>
					<ParaWithTextSimple title="DESCRIPTION" description={que_desc} />

					<Divider style={{ background: "#616161" }} />

					<ParaWithTextSimple title="INPUT" description={input_desc} />
					<ParaWithTextSimple
						title="constrains:"
						description={constrains_desc}
					/>

					<Divider style={{ background: "#616161" }} />

					<ParaWithTextSimple title="OUTPUT" description={output_desc} />

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
