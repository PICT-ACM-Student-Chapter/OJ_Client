import React, {useContext, useEffect, useState} from 'react'
// import {useParams} from "react-router";
import {
    Button,
    Card,
    Col,
    Input,
    Popconfirm,
    Progress,
    Row,
    Select,
    Skeleton,
    Space,
    Spin,
    Tag,
    Typography
} from "antd";
import Editor from "@monaco-editor/react";
import ThemeContext from "../../context/ThemeContext";
import ReactMarkdown from 'react-markdown'
import './QuestionDetail.style.css'
import {Helmet} from "react-helmet";
import {
    CaretRightOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    DownOutlined,
    LeftOutlined, UpOutlined
} from "@ant-design/icons";
import SplitPane from "react-split-pane";

const {Option} = Select;
const question = {
    name: 'Level Nodes',
    description: `You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

![Tux, the Linux mascot](https://assets.leetcode.com/uploads/2020/10/02/addtwonumber1.jpg)
`,
    input_format: '\n' +
        'The first line consists of a single integer  _N_  denoting the number of nodes in the tree. Each of the next  n−1  lines consists of 2 integers  _a_  and  _b_  denoting an undirected edge between node  _a_  and node  _b_. The next line consists of a single integer  _x_.',
    output_format: 'You need to print a single integers denoting the number of nodes on level x.\n' +
        '\n',
    constraints: '',
    test_cases: [
        {
            id: 1,
            input: '4 3\n' +
                '3 3\n' +
                '5 5\n' +
                '6 6\n' +
                '1 1\n' +
                '5 2 7',
            output: '30'
        },
        {
            id: 2,
            input: '3 3\n' +
                '2 2\n' +
                '3 4\n' +
                '4 6\n' +
                '1 10 100\n',
            output: '102'
        }
    ]
}

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

function QuestionDetail() {
    // const {contestId, questionId} = useParams()
    const theme = useContext(ThemeContext)
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
        setTimeout(() => {
            setOutputLoading(false)
            setOutput({
                stderr: `./main.c: In function ‘main’:
./main.c:6:1: error: expected ‘;’ before ‘}’ token
 }
 ^`,
                stdout: 'Hello OJ',
                status: 'AC',
                exec_time: '1.04s'
            })
        }, 2000)
    }

    const handleSubmit = () => {
        setActiveTab('submit')
        setSubmissionLoading(true)
        setPassedTestCases(0)
        setTimeout(()=>{
            setSubmissionLoading(false)
            setTestCases([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
            setTimeout(()=>{
                setTestCases(submitResponse.verdicts)
                setPassedTestCases(3)
            }, 1000)
        }, 700)
    }

    function isOutputError() {
        return output.status !== 'AC'
    }

    useEffect(() => {
        //check if contestID and questionId are valid and user is authorised
    }, [])

    const statusColor = {
        'AC': 'success',
        'CTE': 'danger',
        'RTE': 'danger'
    }

    const testCaseStatusColor = {
        'AC': 'green',
        'CTE': 'red',
        'RTE': 'red',
        'TLE': 'orange'
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{`${question.name} - PASC OJ`}</title>
                <link rel="canonical" href="http://mysite.com/example"/>
            </Helmet>
            <SplitPane split={'vertical'} defaultSize={'50%'} minSize={400} maxSize={-400}
                       style={{position: "relative", width: '100%', height: '88vh', overflowY: 'hidden'}}>
                <div>
                    <Card className='question-card'>
                        <Space>
                            <Button icon={<LeftOutlined/>}>Back</Button>
                            <Typography.Title>{question.name}</Typography.Title>

                        </Space>
                        <ReactMarkdown>{question.description}</ReactMarkdown>
                        <br/><br/>
                        <Typography.Title level={3}>Input Format</Typography.Title>
                        <ReactMarkdown>{question.input_format}</ReactMarkdown>
                        <Typography.Title level={3}>Output Format</Typography.Title>
                        <ReactMarkdown>{question.output_format}</ReactMarkdown>
                        <Typography.Title level={3}>Constraints</Typography.Title>
                        <ReactMarkdown>{question.output_format}</ReactMarkdown>
                        <br/>
                        <Typography.Title level={3}>Sample Testcase(s)</Typography.Title>
                        {
                            question.test_cases.map(({input, output, id}) => (
                                    <div key={id}>
                                        <Row gutter={16}>
                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                <Card className='test-case-card' type="inner"
                                                      title={<Typography.Title level={4}>Input</Typography.Title>}
                                                    // extra={<a href="#">Copy</a>}
                                                >
                                                    <pre>{input}</pre>
                                                </Card>
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>

                                                <Card className='test-case-card' type="inner"
                                                      title={<Typography.Title level={4}>Output</Typography.Title>}
                                                    // extra={<a href="#">Copy</a>}
                                                >
                                                    <pre>{output}</pre>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <br/>
                                    </div>
                                )
                            )
                        }


                    </Card>
                </div>
                <div>
                    <Card style={{marginBottom: '16px', position: 'relative'}} className='button-group-card'>

                        <Select style={{width: 120}} size='large' defaultValue="lucy">
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                                Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </Card>
                    <div style={{position: 'relative', height: '88vh'}}>
                        <div style={{width: '100%', position: 'absolute'}}>
                            <Card width={'100%'} className={'editor-card'}
                                  style={{height: '71vh'}}>
                                <Editor
                                    loading={<Spin size={'large'}/>}
                                    language="cpp"
                                    theme={theme.theme}
                                    options={{
                                        fontSize: 16,
                                    }}
                                />
                            </Card>
                        </div>
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
                                {activeTab === 'output' && <div style={{margin: '20px', overflow: 'scroll', height: '31vh'}}>
                                    {!output.status && !outputLoading && <div style={{textAlign: 'center', marginTop: '5%'}}><Typography.Title disabled level={4}>Please run the code to see the output</Typography.Title> </div>}
                                    {outputLoading && <Skeleton active/>}
                                    {output.status && !outputLoading && <div>
                                        <Space style={{fontSize: '1rem', marginBottom: '1rem'}}>
                                            <Typography.Text
                                                type={statusColor[output.status] || 'warning'}>{output.status || ''}&nbsp;&nbsp;</Typography.Text>
                                            <Typography.Text
                                                type={'secondary'}>Runtime: {output.exec_time || '-- s'}</Typography.Text>
                                        </Space>
                                        <Card style={{minHeight: '12rem'}}>
                                            {!isOutputError() && <pre>{output.stdout}</pre>}
                                            {isOutputError() && <pre style={{color: '#a61d24'}}>{output.stderr}</pre>}
                                        </Card>
                                    </div>}
                                </div>}
                                {activeTab === 'submit' && <div style={{margin: '20px', overflow: 'scroll', height: '31vh'}}>
                                    {!testCases.length > 0 && !submissionLoading && <div style={{textAlign: 'center', marginTop: '5%'}}><Typography.Title disabled level={4}>Please submit the solution first</Typography.Title> </div>}
                                    {submissionLoading && <Skeleton active/>}
                                    {testCases.length > 0 && !submissionLoading && <div>
                                        <Progress success={{percent: Math.round(passedTestCases / testCases.length * 100, 2)}} percent={75} strokeColor={'grey'} status={"active"} />
                                        <Typography.Link>{passedTestCases} of {testCases.length} Test Cases passed</Typography.Link>
                                        <br/><br/>
                                        <Row gutter={[32, 32]} justify="center" style={{justifyContent: "center"}}>
                                            {testCases.map((tc, i) => (
                                                <Col key={tc.id} span={8}>
                                                    <Card style={{height: '5.7rem'}}>
                                                        <Skeleton loading={!tc.status || tc.status === 'IN_QUEUE'} round avatar
                                                                  paragraph={{rows: 0}} title={{width: '10rem'}} active>
                                                            <Card.Meta title={`Testcase #${i + 1}`}
                                                                       description={<Tag
                                                                           color={testCaseStatusColor[tc.status]}>{tc.status}</Tag>}
                                                                       avatar={<>
                                                                           {tc.status === 'AC' && <Typography.Title level={2}
                                                                               type={'success'}><CheckCircleOutlined/></Typography.Title>}
                                                                           {(tc.status === 'CTE' || tc.status === 'RTE') &&
                                                                           <Typography.Title level={2}
                                                                               type={'danger'}><CloseCircleOutlined/></Typography.Title>}
                                                                           {tc.status === 'TLE' && <Typography.Title level={2}
                                                                               type={'warning'}><ClockCircleOutlined/></Typography.Title>}
                                                                       </>
                                                                       }
                                                            />
                                                        </Skeleton>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>}
                                </div>}
                            </Card>}
                        </div>
                    </div>
                </div>
            </SplitPane>
        </div>

    )
}

export default QuestionDetail
