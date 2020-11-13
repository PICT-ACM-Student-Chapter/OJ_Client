import React from "react";
import {
	CaretLeftFilled,
	CaretRightFilled,
	PlayCircleFilled,
	SendOutlined,
} from "@ant-design/icons";
import {
	PageHeader,
	Button,
	Descriptions,
	Typography,
	Divider,
	Table,
	Space,
} from "antd";
const { Title, Paragraph } = Typography;

const columns = [
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

const data = [
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
];

function QuestionPage() {
	return (
		<div style={{ width: "60%", border: "1px solid #ffffff", margin: "1rem" }}>
			{/* Question Title */}
			<div className="site-page-header-ghost-wrapper">
				<PageHeader
					ghost={false}
					title="A. Let's Crack it."
					extra={[
						<Button key="3">
							<CaretLeftFilled />
							Prev Question
						</Button>,
						<Button key="2">
							Next Question
							<CaretRightFilled />
						</Button>,
					]}
				>
					<Descriptions size="small" column={1}>
						<Descriptions.Item label="Time Limit">1 sec</Descriptions.Item>
						<Descriptions.Item label="Memory Limit">
							50000 Bytes
						</Descriptions.Item>
					</Descriptions>
				</PageHeader>
			</div>

			{/* Question Descriptions */}
			<Typography style={{ textAlign: "left", padding: "1rem" }}>
				<Paragraph>
					In the process of internal desktop applications development, many
					different design specs and implementations would be involved, which
					might cause designers and developers difficulties and duplication and
					reduce the efficiency of development. After massive project practice
					and summaries, Ant Design, a design language for background
					applications, is refined by Ant UED Team, which aims to uniform the
					user interface specs for internal background projects, lower the
					unnecessary cost of design differences and implementation and liberate
					the resources of design and front-end development. In the process of
					internal desktop applications development, many different design specs
					and implementations would be involved, which might cause designers and
					developers difficulties and duplication and reduce the efficiency of
					development. In the process of internal desktop applications
					development, many different design specs and implementations would be
					involved, which might cause designers and developers difficulties and
					duplication and reduce the efficiency of development.
				</Paragraph>

				<Divider style={{ background: "#616161" }} />
				<Title level={5}>INPUT</Title>
				<Paragraph>
					We supply a series of design principles, practical patterns and high
					quality design resources.
					<div>
						<Title level={5}>constrains:</Title>
						<Paragraph>{`x < 50, 0 < n < 10^9`}</Paragraph>
					</div>
				</Paragraph>

				<Divider style={{ background: "#616161" }} />
				<Title level={5}>OUTPUT</Title>
				<Paragraph>
					We supply a series of design principles, practical patterns and high
					quality design resources.
				</Paragraph>

				<Divider style={{ background: "#616161" }} />
				<Title level={5}>TESTCASES</Title>
				<Table columns={columns} dataSource={data} />

				<Space>
					<Button type="primary">
						RUN
						<PlayCircleFilled />
					</Button>
					<Button type="primary">
						SUBMIT
						<SendOutlined />
					</Button>
				</Space>
			</Typography>
		</div>
	);
}

export default QuestionPage;
