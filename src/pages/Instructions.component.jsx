import React from "react";
import ReactMarkdown from 'react-markdown'
import { Card, Space, Checkbox, Button } from "antd";
import { Row, Col } from "antd";
import axios from "axios";

var instructions = ""
var id=1

axios({method:"get",url:" https://api.onlinejudge.ml/contests/1" , headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json"}})
    .then(res => {
        instructions=res.data.instructions
    })   
 
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
							<ReactMarkdown source={instructions}/>
						</Card>
						<Checkbox onChange={onChange}>
							I have read all the instructions and ready to proceed.
						</Checkbox>
						<Button>Start Contest</Button>
					</Space>
				</Col>
			</Row>
		</div>
	);
}

export default ContestInstructions;