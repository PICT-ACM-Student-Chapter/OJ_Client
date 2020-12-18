import {Table, Tag, Typography} from 'antd'
import React, {useEffect, useState} from 'react'
import axios from "axios";

const columns = [
    {
        title: <Typography.Title level={5}>#</Typography.Title>,
        dataIndex: 'num',
        width: '5rem',
        align: 'center'
    },
    {
        title: <Typography.Title level={5}>Submission Time</Typography.Title>,
        dataIndex: 'timestamp',
        width: '20rem',
        align: 'center'
    },
    {
        title: <Typography.Title level={5}>Status</Typography.Title>,
        dataIndex: 'status',
        width: '12rem',
        align: 'center'
    },
    {
        title: <Typography.Title level={5}>Score</Typography.Title>,
        dataIndex: 'score',
        width: '12rem',
        align: 'center'
    }]

function Submissions(props) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        getSubmissions();

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
                generateData(res.data.results)
            })
            .catch(e => {
                console.log(e.data)
            })
    }


    const generateData = (leaderBoard) => {
        //Create leaderboard data

        const lb = leaderBoard.map(row => {
            const base = {
                name: row.user_id.username,
                score: row.total_score,
                penalty: row.total_penalty,
            }
            for (let i of row.questions) {
                base[`question${i.que_id}`] = {score: i.score, pealty: i.penalty}
            }
            return base
        })
        lb.sort((a, b) => ((a.score === b.score) ? (b.score - a.score) : (a.penalty - b.penalty)))

        for (let i = 0; i < lb.length; i++) {
            lb[i].rank = i + 1;
        }
        setData(lb)
    }


    return (
        <div>
            <Typography.Title>Submissions</Typography.Title>
            <Typography.Title type={'secondary'} level={4}>{'Question name here'}</Typography.Title>
            <br/>
            <Typography.Text>Your score: 256/680 | Rank: 5</Typography.Text>
            <br/><br/><br/>
            <Table bordered dataSource={data} columns={columns} loading={loading} pagination={false}/>
        </div>
    )
}

export default Submissions
