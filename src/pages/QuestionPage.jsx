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
const extraProbDetails = [
	{ name: "Time Limit", val: "1 sec" },
	{ name: "Memory Limit", val: "50000 Bytes" },
];
const questionDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
et dolore magna aliqua. Viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas. Vestibulum mattis ullamcorper vel.
Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est. Vestibulum morbi blandit cursus risus at ultrices mi. Lacinia at quis risus sed. Ut enim blandit volutpat maecenas volutpat blandit. In tellus integer feugiat scelerisque varius morbi enim nunc. Egestas quis ipsum suspendisse ultrices gravida dictum fusce. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin. Dis parturient montes nascetur ridiculus. Elementum facilisis leo vel fringilla est ullamcorper. Semper risus in hendrerit gravida rutrum quisque.`;
const inputDescription =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const contrainsDescription =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const outputDescription =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

// testcases data
const testCaseData = [
	{
		key: "1",
		Number: 1,
		Input: "6 1 2 2 3 4 5 6",
		Output: "6",
	},
	{
		key: "2",
		Number: 2,
		Input: "6 1 2 2 3 4 5 6",
		Output: "6",
	},
	{
		key: "3",
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
		key: "2",
		Time_Submitted: "19:05",
		Submission_ID: "PZ100293094",
		Status: "Accepted",
		Runtime: "23ms",
		Memory: "13kb",
		Language: "cpp",
	},
	{
		key: "3",
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
