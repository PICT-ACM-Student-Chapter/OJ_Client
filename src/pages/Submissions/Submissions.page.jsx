import {Button, Col, Row, Space, Table, Tag, Typography} from 'antd'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import SubmitComponent from "../../components/QuestionPage/Submit.component";
import Modal from "antd/es/modal/Modal";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {vs, vs2015} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {b64Decode, parseDate} from "../../utils/utils";
import {useLocation} from "react-router";
import {ForkOutlined} from "@ant-design/icons";

const statusColor = {
    'AC': 'green',
    'CTE': 'red',
    'RTE': 'red',
    'TLE': 'orange',
    'WA': 'red',
    'PA': 'lime',
    'CE': 'red'
}

const theme = () => {
    if (localStorage.getItem('theme') === 'dark') {
        return vs2015
    } else {
        return vs
    }
}


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Submissions(props) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [submissions, setSubmissions] = useState([])
    const [visible, setVisible] = useState(false);
    const [code, setCode] = useState(null)
    const [lang, setLang] = useState([])
    const [codeLang, setCodeLang] = useState({})

    useEffect(() => {
        getLanguages();
        // setSubmissions(submitResponse)
        // generateData(submitResponse)
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        console.log(loading)
        getSubmissions();
        // setSubmissions(submitResponse)
        // generateData(submitResponse)
        // eslint-disable-next-line
    }, [lang]);

    const onClickView = (record) => {
        console.log(record)
        setCode(record.code)
        setCodeLang(record.lang)
        setVisible(true)
    }


    const columns = [
        {
            title: <Typography.Title level={5}>#</Typography.Title>,
            dataIndex: 'num',
            width: '5rem',
            align: 'center'
        },
        {
            title: <Typography.Title level={5}>Submission Time</Typography.Title>,
            dataIndex: 'created_at',
            width: '20rem',
            align: 'center',
            key: 'created_at',
            render: date => {
                console.log(date)
                return (
                    <>
                        {parseDate(date)}
                    </>
                )
            },
        },
        {
            title: <Typography.Title level={5}>Status</Typography.Title>,
            dataIndex: 'status',
            width: '12rem',
            align: 'center',
            key: 'status',
            render: status => {
                console.log(status)
                return (
                    <>

                        <Tag color={statusColor[status]}>
                            {status}
                        </Tag>
                    </>
                )
            },
        },
        {
            title: <Typography.Title level={5}>Score</Typography.Title>,
            dataIndex: 'score',
            width: '12rem',
            align: 'center'
        },
        {
            title: <Typography.Title level={5}>Language</Typography.Title>,
            dataIndex: 'lang',
            width: '12rem',
            align: 'center',
            key: 'lang',
            render: lang => {
                return (
                    <>
                        <Tag color="volcano">
                            {lang && lang.name}
                        </Tag>
                    </>
                )
            }
        },
        {
            title: <Typography.Title level={5}>Code</Typography.Title>,
            width: '12rem',
            align: 'center',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => onClickView(record)}>View Code</Button>
                </Space>
            ),
        },

    ]

    const getSubmissions = () => {
        setLoading(true)

        axios.get(`${process.env.REACT_APP_BASE_URL}/contests/${props.match.params.contestId}/questions/${props.match.params.questionId}/submissions`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                setLoading(false)
                setSubmissions(res.data.results)
                generateData(res.data.results)

            })
            .catch(e => {
                console.log(e.data)
            })
    }

    const getLanguages = async () => {
        const resLanguages = await axios.get(`${process.env.REACT_APP_BASE_URL}/languages`)
        setLang(resLanguages.data.results)
    }

    const getLangfromId = (id) => {
        if (lang) {
            for (let i of lang) {
                if (i.id === id)
                    return i
            }
        } else {
            return {}
        }

    }

    const generateData = (submissions) => {

        const sub = submissions.map((row, i) => {
            return {
                num: i + 1,
                created_at: row.created_at,
                status: row.status,
                score: row.score,
                code: row.code,
                lang: getLangfromId(row.lang_id),
                key: row.id
            }
        })
        sub.sort((a, b) => (new Date(b.created_at) - new Date(a.created_at)))

        setData(sub)
        setLoading(false)
    }


    const expandedRowRender = (record) => {

        let passedTestCases = 0;

        let testcases = []

        submissions.forEach(submission => {

            if (submission.id === record.key) {
                submission.verdicts.forEach(testcase => {
                    if (testcase.status === 'AC') {
                        passedTestCases++;
                    }
                })
                testcases = submission.verdicts
            }

        })

        return <SubmitComponent testCases={testcases} submissionLoading={false} passedTestCases={passedTestCases}/>
    }

    let query = useQuery();


    return (
        <div style={{padding: "2% 4%"}}>
            <Typography.Title>Submissions</Typography.Title>
            <Typography.Title type={'secondary'} level={3}>{query.get("name") || ""}</Typography.Title>
            <br/><br/><br/>
            <Table bordered dataSource={data} columns={columns} loading={false}
                   pagination={false} expandable={{expandedRowRender}}
            />
            <Modal
                title={
                    <div>
                        <Row>
                            <Col span={14}>
                                <Typography.Title level={3}>Submitted Code</Typography.Title>
                                <Typography.Title type={'secondary'} level={4}>{codeLang.name}</Typography.Title>
                            </Col>
                            <Col span={10} align='right' style={{padding: '1.5rem 3rem'}}>
                                <Button size='large' icon={<ForkOutlined/>} onClick={
                                    () => {
                                        let savedCode = JSON.parse(localStorage.getItem(`codes${props.match.params.questionId}`) || "{}")
                                        savedCode[codeLang.id] = b64Decode(code)
                                        localStorage.setItem(`codes${props.match.params.questionId}`, JSON.stringify(savedCode))
                                        localStorage.setItem('preferredLanguage', codeLang.id)
                                        props.history.push(`/contests/${props.match.params.contestId}/${props.match.params.questionId}`)
                                    }
                                }>Open in Editor</Button>
                            </Col>
                        </Row>
                    </div>
                }
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
            >
                <SyntaxHighlighter language={codeLang.monaco_lang_code} style={theme()}>
                    {b64Decode(code)}
                </SyntaxHighlighter>
            </Modal>
        </div>
    )
}

export default Submissions


// const submitResponse = [
//     {
//         id: 1,
//         status: 'AC',
//         score: 80,
//         created_at: new Date(),
//         code: 'This is testing code 1',
//         verdicts: [
//             {status: 'AC'},
//             {status: 'RTE'},
//             {status: 'TLE'},
//             {status: 'IN_QUEUE'},
//             {status: 'AC'},
//             {status: 'RTE'},
//             {status: 'TLE'},
//             {status: 'IN_QUEUE'},
//             {status: 'AC'},
//             {status: 'RTE'},
//             {status: 'TLE'},
//             {status: 'IN_QUEUE'},
//         ]
//     }, {
//         id: 2,
//         status: 'TLE',
//         score: 0,
//         created_at: new Date(),
//         code: 'This is testing code 2',
//         verdicts: [
//             {status: 'AC'},
//             {status: 'RTE'},
//             {status: 'TLE'},
//             {status: 'IN_QUEUE'},
//             {status: 'AC'},
//             {status: 'RTE'},
//             {status: 'TLE'},
//             {status: 'IN_QUEUE'},
//             {status: 'AC'},
//             {status: 'RTE'},
//             {status: 'TLE'},
//             {status: 'IN_QUEUE'},
//         ]
//     }, {
//         id: 3,
//         status: 'WA',
//         score: 0,
//         created_at: new Date(),
//         code: 'This is testing code 3',
//         verdicts: [
//             {status: 'AC'},
//             {status: 'RTE'},
//             {status: 'TLE'},
//             {status: 'IN_QUEUE'},
//             {status: 'AC'},
//             {status: 'RTE'},
//             {status: 'TLE'},
//             {status: 'IN_QUEUE'},
//             {status: 'AC'},
//             {status: 'RTE'},
//             {status: 'TLE'},
//             {status: 'IN_QUEUE'},
//         ]
//     }, {
//         id: 4,
//         status: 'AC',
//         score: 70,
//         created_at: new Date(),
//         code: 'This is testing code 4',
//         verdicts: [
//             {status: 'AC'},
//             {status: 'RTE'},
//             {status: 'TLE'},
//
//         ]
//     },
//
// ]
