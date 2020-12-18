import {Table, Tag, Typography} from 'antd'
import React, {useEffect, useState} from 'react'
import axios from "axios";
import SubmitComponent from "../../components/QuestionPage/Submit.component";

const statusColor = {
    'AC': 'green',
    'CTE': 'red',
    'RTE': 'red',
    'TLE': 'orange',
    'WA': 'red'
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
        align: 'center'
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
    }]

const submitResponse = [
    {
        id: 1,
        status: 'AC',
        score: 80,
        created_at: new Date(),
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
    }, {
        id: 2,
        status: 'TLE',
        score: 0,
        created_at: new Date(),
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
    }, {
        id: 3,
        status: 'WA',
        score: 0,
        created_at: new Date(),
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
    }, {
        id: 4,
        status: 'AC',
        score: 70,
        created_at: new Date(),
        verdicts: [
            {status: 'AC'},
            {status: 'RTE'},
            {status: 'TLE'},

        ]
    },

]


//TODO: Change Hard Coded Values
function Submissions(props) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [submissions, setSubmissions] = useState([])

    useEffect(() => {
        getSubmissions();
        setSubmissions(submitResponse)
        generateData(submitResponse)
        // eslint-disable-next-line
    }, []);


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
                // setSubmissions(res.data.results)
                // generateData(res.data.results)

            })
            .catch(e => {
                console.log(e.data)
            })
    }


    const generateData = (submissions) => {

        const sub = submissions.map((row, i) => {
            return {
                num: i + 1,
                created_at: new Date(row.created_at).toLocaleTimeString() + " - " + new Date(row.created_at).toDateString(),
                status: row.status,
                score: row.score,
                key: row.id
            }
        })
        sub.sort((a, b) => (b.created_at - a.created_at))

        setData(sub)
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

    return (
        <div>
            <Typography.Title>Submissions</Typography.Title>
            <Typography.Title type={'secondary'} level={4}>{'Question name here'}</Typography.Title>
            <br/><br/><br/>
            <Table bordered dataSource={data} columns={columns} loading={loading}
                   pagination={false} expandable={{expandedRowRender}}
            />
        </div>
    )
}

export default Submissions
