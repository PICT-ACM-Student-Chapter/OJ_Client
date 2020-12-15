import React, {useContext, useEffect, useState} from 'react'
// import {useParams} from "react-router";
import {Button, Card, Col, Input, Row, Select, Skeleton, Space, Spin, Typography} from "antd";
import Editor from "@monaco-editor/react";
import ThemeContext from "../../context/ThemeContext";
import ReactMarkdown from 'react-markdown'
import './QuestionDetail.style.css'
import {Helmet} from "react-helmet";
import {LeftOutlined} from "@ant-design/icons";
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

function QuestionDetail() {
    // const {contestId, questionId} = useParams()
    const theme = useContext(ThemeContext)
    const [isTerminalOpen, setTerminalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('input')
    const [outputLoading, setOutputLoading] = useState(true);
    const [output, setOutput] = useState('');
    const [isOutputError, setIsOutputError] = useState(false);


    const tabList = [
        {
            key: 'input',
            tab: 'Input'
        }, {
            key: 'output',
            tab: 'Output'
        }
    ]

    const handleRun = () => {
        setActiveTab('output')
        setOutputLoading(true)
        setIsOutputError(false)
        setTimeout(() => {
            setOutputLoading(false)
            setOutput("Error")
            setIsOutputError(true)
        }, 2000)
    }

    useEffect(() => {
        //check if contestID and questionId are valid and user is authorised
    }, [])

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
                                  style={{height: '72vh'}}>
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
                            <Card style={{marginTop: '16px', marginBottom: '0px', position: 'relative', top: '74vh'}}
                                  className='button-group-card'>
                                <Space>
                                    <Button onClick={_ => {
                                        setTerminalOpen(!isTerminalOpen)
                                        setActiveTab('input')
                                    }} success>Run</Button>
                                </Space>
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
                                          <Button onClick={handleRun} success>RUN</Button>
                                          <Button onClick={_ => setTerminalOpen(!isTerminalOpen)} danger>Close</Button>
                                      </Space>
                                  }>
                                {activeTab === 'input' &&
                                <div style={{margin: '20px'}}>
                                    <Input.TextArea size={'large'} autoSize={{minRows: 5, maxRows: 8}}/>
                                </div>
                                }
                                {activeTab === 'output' && <div style={{margin: '20px'}}>
                                    {outputLoading && <Skeleton active/>}
                                    {!outputLoading &&
                                    <pre style={{color: (isOutputError ? 'red' : 'default')}}>{output}</pre>}
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
