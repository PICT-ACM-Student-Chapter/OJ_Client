import React from "react";
import SplitPane from "react-split-pane";
import { Scrollbars } from "react-custom-scrollbars";
import QuestionHeader from "../components/QuestionHeader";
import QuestionDetails from "../components/QuestionDetails";
import SubmissionHistory from "../components/SubmissionHistory";
import FooterNav from "../components/FooterNav";
import { Space, Tabs } from "antd";

const { TabPane } = Tabs;

const problemTitle = "Lets's Do it!";
const extraProbDetails = "NONE";
const questionDescription = "This is QD";
const inputDescription = "this is ID";
const contrainsDescription = "this is CD";
const outputDescription = "this is OD";

// testcases data - to be provided in tabular form
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
									<Space direction="vertical" size="middle">
										<QuestionHeader
											title={problemTitle}
											otherDetails={extraProbDetails}
										/>
										<QuestionDetails
											questionDescription={questionDescription}
											inputDescription={inputDescription}
											contrainsDescription={contrainsDescription}
											outputDescription={outputDescription}
											testcases={testCaseData}
										/>
									</Space>
								</div>
							</TabPane>
							<TabPane tab="Submissions" key="2">
								<SubmissionHistory submHistoryData={submHistoryData} />
							</TabPane>
						</Tabs>
					</div>
				</Scrollbars>

				<div style={{ height: "100%", background: "#616161" }}>
					<FooterNav />
				</div>
			</SplitPane>
		</div>
	);
}

export default QuestionPage;
