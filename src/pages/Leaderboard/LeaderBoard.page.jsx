import {Table, Tag, Typography} from 'antd'
import React, {useEffect, useState} from 'react'
import axios from "axios";

const defaultCols = [
    {
        title: <Typography.Title level={5}>Rank</Typography.Title>,
        dataIndex: 'rank',
        width: '5rem',
        fixed: 'left',
        align: 'center'
    },
    {
        title: <Typography.Title level={5}>Name</Typography.Title>,
        dataIndex: 'name',
        width: '20rem',
        fixed: 'left',
        align: 'center'
    },
    {
        title: <Typography.Title level={5}>Score</Typography.Title>,
        dataIndex: 'score',
        width: '12rem',
        fixed: 'left',
        align: 'center'
    },
    {
        title: <Typography.Title level={5}>Penalty</Typography.Title>,
        dataIndex: 'penalty',
        width: '12rem',
        fixed: 'left',
        align: 'center'
    }]

function LeaderBoard(props) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([defaultCols])
    const [contest, setContest] = useState({})

    useEffect(() => {
        getLeaderBoard();
        getQuestions();

        // eslint-disable-next-line
    }, []);


    const getLeaderBoard = () => {
        setLoading(true)

        axios.get(`${process.env.REACT_APP_BASE_URL}/contests/${props.match.params.contestId}/leaderboard`,
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

    const getQuestions = () => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_BASE_URL}/contests/${props.match.params.contestId}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                setContest(res.data)
                generateColumns(res.data.questions)
            }).then(() => {
            setLoading(false)
        })
            .catch(e => {
                console.log(e.data)
            })
    }


    const generateColumns = (questions) => {
        // col = a copy of defaultCols
        let col = [...defaultCols];

        questions.sort((a, b) => parseInt(a.order) - parseInt(b.order))
        console.log(questions.length)

        questions.forEach((que, i) => {

            console.log(que)
            //Set Column for leaderboard table
            col.push({
                title: <Typography.Title level={5}>{`${que.question.name}`}</Typography.Title>,
                dataIndex: `question${que.question.id}`,
                key: `question${i}`,
                width: '15rem',
                align: 'center',
                render: question => {
                    console.log(question)
                    if (question)
                        return (
                            <>

                                <Tag color='green'>
                                    Score: {question.score || 0}
                                </Tag>
                                <Tag color='red'>
                                    Penalty: {question.penalty || 0}
                                </Tag>

                            </>
                        )
                    return ''
                },
            })

            if (i === (questions.length - 1)) {
                console.log(col)
                setColumns(col)
            }
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
        <div style={{padding:"2% 4%"}}>
            <Typography.Title>Leaderboard</Typography.Title>
            <Typography.Title type={'secondary'} level={3}>{contest.name || ''}</Typography.Title>
            <br/>
            <Typography.Text>Your score: 256/680 | Rank: 5</Typography.Text>
            <br/><br/><br/>
            <Table bordered dataSource={data} columns={columns} loading={loading} pagination={false}/>
        </div>
    )
}

export default LeaderBoard
