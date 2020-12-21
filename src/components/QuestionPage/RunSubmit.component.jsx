import React from 'react'
import {Button, Card, Input, Popconfirm, Space} from "antd";
import {CaretRightOutlined, DownOutlined, UpOutlined} from "@ant-design/icons";
import RunOutputComponent from "./RunOutput.component";
import SubmitComponent from "./Submit.component";


const {useState} = React


//-------------- Hardcoded API Responses for testing ---------------

const submitResponse = {
    verdicts: [
        {status: 'AC'},
        {status: 'RTE'},
        {status: 'TLE'},
        {status: 'IN_QUEUE'},
        {status: 'AC'},
        {status: 'RTE'},
        {status: 'TLE'},
        {status: 'IN_QUEUE'},
        {status: 'AC'},
        {status: 'RTE'},
        {status: 'TLE'},
        {status: 'IN_QUEUE'},
    ]
}

const runOutputResponse = {
    stderr: `./main.c: In function ‘main’:
./main.c:6:1: error: expected ‘;’ before ‘}’ token
 }
 ^`,
    stdout: 'Hello OJ',
    status: 'AC',
    exec_time: '1.04s'
}


//-------------- Hardcoded API Responses for testing ends ---------------


export default function RunSubmit(props) {
    const [isTerminalOpen, setTerminalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('input')
    const [outputLoading, setOutputLoading] = useState(false);
    const [output, setOutput] = useState({});
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [submission, setSubmission] = useState({});
    const [testCases, setTestCases] = useState([]);
    const [passedTestCases, setPassedTestCases] = useState(0);

    const tabList = [
        {
            key: 'input',
            tab: 'Input'
        }, {
            key: 'output',
            tab: 'Output'
        }, {
            key: 'submit',
            tab: 'Submission'
        }
    ]

    const handleRun = () => {
        setActiveTab('output')
        setOutputLoading(true)
        // Simulate latency
        setTimeout(() => {
            setOutputLoading(false)
            setOutput(runOutputResponse)
        }, 2000)
    }

    const handleSubmit = () => {
        setActiveTab('submit')
        setSubmissionLoading(true)
        setPassedTestCases(0)
        // Simulate latency
        setTimeout(() => {
            setSubmissionLoading(false)
            setTestCases([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
            setTimeout(() => {
                setTestCases(submitResponse.verdicts)
                setPassedTestCases(3)
            }, 1500)
        }, 1200)
    }

    return (
        <div>
            {!isTerminalOpen &&
            <Card style={{marginTop: '16px', marginBottom: '0px', position: 'relative', top: '73vh'}}
                  className='button-group-card' hoverable
                  onClick={_ => {
                      setTerminalOpen(!isTerminalOpen)
                      setActiveTab('input')
                  }}
                  extra={<Space>
                      <Button shape={'circle'} icon={<UpOutlined/>}/>
                  </Space>}
                  title={'Run and Submit'}
            >

            </Card>}
            {isTerminalOpen &&
            <Card style={{
                marginTop: '16px',
                marginBottom: '0px',
                height: '40vh',
                position: 'relative',
                top: '40vh'
            }} tabList={tabList}
                  className='button-group-card' onTabChange={setActiveTab} activeTabKey={activeTab}
                  extra={
                      <Space style={{position: 'absolute', right: 16, zIndex: 10}}>
                          <Button onClick={handleRun}><CaretRightOutlined/>Run</Button>
                          <Popconfirm
                              placement="topRight"
                              title={'Are you sure you want to submit?'}
                              onConfirm={handleSubmit}
                              okText="Yes"
                              cancelText="No"
                          >
                              <Button type={'primary'}>Submit</Button>
                          </Popconfirm>
                          <Button onClick={_ => setTerminalOpen(!isTerminalOpen)} shape={'circle'}
                                  icon={<DownOutlined/>}/>
                      </Space>
                  }>
                {activeTab === 'input' &&
                <div style={{margin: '20px', overflow: 'scroll', height: '31vh'}}>
                    <Input.TextArea size={'large'} autoSize={{minRows: 5, maxRows: 8}}/>
                </div>
                }
                {activeTab === 'output' &&
                <RunOutputComponent output={output} outputLoading={outputLoading}/>}
                {activeTab === 'submit' &&
                <SubmitComponent testCases={testCases} submissionLoading={submissionLoading}
                                                            passedTestCases={passedTestCases}/>}
            </Card>}
        </div>
    )
}