import React from "react";
import SplitPane from "react-split-pane";
import { Scrollbars } from "react-custom-scrollbars";
import QuestionHeader from "../components/QuestionHeader";
import QuestionDetails from "../components/QuestionDetails";
import SubmissionHistory from "../components/SubmissionHistory";
import FooterNav from "../components/FooterNav";
import { Tabs } from "antd";

const { TabPane } = Tabs;

// styling for split pane
const splitPaneStyles = {
	background: "#adadb1",
	width: "4px",
	cursor: "col-resize",
	height: "100%",
};

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
				<Scrollbars style={{ height: "95vh" }}>
					<div style={{ margin: "1.5rem" }}>
						<Tabs type="card">
							<TabPane tab="Problem" key="1">
								<div>
									<QuestionHeader />
									<QuestionDetails />
								</div>
							</TabPane>
							<TabPane tab="Submissions" key="2">
								<SubmissionHistory></SubmissionHistory>
							</TabPane>
						</Tabs>
					</div>
				</Scrollbars>

				<div style={{ height: "100%", background: "#616161" }}>
					<FooterNav></FooterNav>
				</div>
			</SplitPane>
		</div>
	);
}

export default QuestionPage;
