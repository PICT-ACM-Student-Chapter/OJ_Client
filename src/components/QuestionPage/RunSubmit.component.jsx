import React from 'react'
import {Button, Card, Input, Popconfirm, Space} from "antd";
import {CaretRightOutlined, DownOutlined, LoadingOutlined, UpOutlined} from "@ant-design/icons";
import RunOutputComponent from "./RunOutput.component";
import SubmitComponent from "./Submit.component";
import axios from "axios";
import {b64Encode, sleep} from '../../utils/utils'

const {useState} = React

const RUN_INTERVAL = 1  // In secs
const SUBMIT_INTERVAL = 1  // In secs


export default function RunSubmit(props) {
    const [isTerminalOpen, setTerminalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('input')
    const [input, setInput] = useState('')

    const [outputLoading, setOutputLoading] = useState(false);
    const [output, setOutput] = useState({});

    const [submissionLoading, setSubmissionLoading] = useState(false);

    // eslint-disable-next-line
    const [submission, setSubmission] = useState({});
    const [testCases, setTestCases] = useState([]);


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

    const checkRun = async (id) => {
        const reqConfig = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/run/${id}`, reqConfig)
        console.log(res.data)
        if (res.data.status === 'IN_QUEUE') {
            await sleep(RUN_INTERVAL * 1000);
            checkRun(id)
        } else {
            setOutputLoading(false)
            setOutput(res.data)
        }
    }

    const checkSubmit = async (id) => {
        const reqConfig = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/contests/${props.match.params.contestId}/questions/${props.match.params.questionId}/submit/${id}`, reqConfig)
        console.log(res.data)

        setSubmission(res.data)
        setTestCases(res.data.verdicts)

        let totalJudged = 0;
        for (let i of res.data.verdicts) {
            if (i.status !== 'IN_QUEUE') {
                totalJudged++;
            }
        }

        if (totalJudged !== res.data.verdicts.length) {
            await sleep(SUBMIT_INTERVAL)
            checkSubmit(id)
        }

    }

    const handleRun = async () => {
        setActiveTab('output')
        setOutputLoading(true)

        const data = {
            lang_id: props.getLang().id,
            code: b64Encode(props.getCode()),
            stdin: b64Encode(input)
        }
        const reqConfig = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/run`, data, reqConfig)
            const subId = res.data.id

            checkRun(subId)
        }catch(e){
            setOutputLoading(false)
        }
    }


    const handleSubmit = async () => {
        setActiveTab('submit')
        setSubmissionLoading(true)

        const data = {
            lang_id: props.getLang().id,
            code: b64Encode(props.getCode())
        }
        const reqConfig = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/contests/${props.match.params.contestId}/questions/${props.match.params.questionId}/submit`, data, reqConfig)

            console.log(res.data)

            setSubmissionLoading(false)

            if (res.status !== 201)
                return

            const subId = res.data.id
            setTestCases(res.data.verdicts)
            checkSubmit(subId)
        } catch (e) {
            setSubmissionLoading(false)
        }
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
                          <Button disabled={outputLoading} onClick={handleRun}>
                              {outputLoading ? <LoadingOutlined/> : <CaretRightOutlined/>}
                              Run
                          </Button>
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
                    <Input.TextArea size={'large'} autoSize={{minRows: 5, maxRows: 8}}
                                    onChange={e => setInput(e.target.value)} value={input}/>
                </div>
                }
                {activeTab === 'output' &&
                <RunOutputComponent output={output} outputLoading={outputLoading}/>}
                {activeTab === 'submit' &&
                <SubmitComponent testCases={testCases} submissionLoading={submissionLoading} />}
            </Card>}
        </div>
    )
}