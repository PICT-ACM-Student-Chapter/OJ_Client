import React from "react";
import { Card, Space, Checkbox, Button } from "antd";
import { Row, Col, Divider } from "antd";

const instructions = [
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
];
const total_inst = instructions.length;

function onChange(e) {
	console.log(`checked = ${e.target.checked}`);
}

function ContestInstructions() {
	return (
		<div>
			<Row
				justify="center"
				align="middle"
				style={{ width: "100%", height: "80vh" }}
			>
				<Col span={16}>
					<Space direction="vertical" size="middle">
						<Card title="INSTRUCTIONS">
							{instructions.map((instruction, i) => {
								return i + 1 === total_inst ? (
									<p style={{ textAlign: "left" }}>
										{i + 1 + ". " + instruction}
									</p>
								) : (
									<div>
										<p style={{ textAlign: "left" }}>
											{i + 1 + ". " + instruction}
										</p>
										<Divider style={{ background: "#303030" }} />
									</div>
								);
							})}
						</Card>
						<Checkbox onChange={onChange}>
							I have read all the instructions and ready to proceed.
						</Checkbox>
						<Button>Enter</Button>
					</Space>
				</Col>
			</Row>
		</div>
	);
}

export default ContestInstructions;
