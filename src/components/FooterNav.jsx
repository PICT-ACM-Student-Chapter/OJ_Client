import React from "react";
import {
	PlayCircleOutlined,
	SendOutlined,
	UploadOutlined,
	BarsOutlined,
	AlignLeftOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";

function FooterNav() {
	return (
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
	);
}

export default FooterNav;
