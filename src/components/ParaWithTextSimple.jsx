import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

function ParaWithTextSimple(props) {
	return (
		<div>
			<Title level={5}>{props.title}</Title>
			<Paragraph>{props.description}</Paragraph>
		</div>
	);
}

export default ParaWithTextSimple;
