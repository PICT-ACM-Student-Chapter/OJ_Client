import React, {useContext, useEffect} from 'react'
// import {useParams} from "react-router";
import {Button, Card, Col, Row, Select, Space, Spin, Typography} from "antd";
import Editor from "@monaco-editor/react";
import ThemeContext from "../../context/ThemeContext";
import ReactMarkdown from 'react-markdown'
import './QuestionDetail.style.css'
import {Helmet} from "react-helmet";
import {LeftOutlined} from "@ant-design/icons";
import SplitPane from "react-split-pane";
import RunSubmit from "../../components/QuestionPage/RunSubmit.component";

const {Option} = Select;

//-------------- Hardcoded API responses for testing ------------------

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

//-------------- Hardcoded API responses for testing ends ---------------


function QuestionDetail() {
    const theme = useContext(ThemeContext)

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
                        <RunSubmit/>
                    </div>
                </div>
            </SplitPane>
        </div>

    )
}

export default QuestionDetail
