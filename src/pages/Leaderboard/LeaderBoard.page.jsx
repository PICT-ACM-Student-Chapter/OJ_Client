import {Card, Table, Tag, Typography} from 'antd'
import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import UserContext from "../../context/User";
import "./leaderboard.css"
import {TrophyOutlined} from "@ant-design/icons";

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

    const userContext = useContext(UserContext);

    useEffect(() => {
        if (userContext.user !== null) {
            getLeaderBoard();
            getQuestions();
        }
        // eslint-disable-next-line
    }, [userContext.user]);


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
                axios.get(`${process.env.REACT_APP_BASE_URL}/contests/${props.match.params.contestId}/questions`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(res => {
                    console.log(res.data)
                    generateColumns(res.data)
                })

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
                title: <Typography.Title level={5}>{`${que.name}`}</Typography.Title>,
                dataIndex: `question${que.id}`,
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
                base[`question${i.que_id}`] = {score: i.score, penalty: i.penalty}
            }
            return base
        })
        lb.sort((a, b) => ((a.score === b.score) ? (a.penalty - b.penalty) : (b.score - a.score)))

        for (let i = 0; i < lb.length; i++) {
            if (userContext.user.username === lb[i].name) {
                userContext.setRank(i + 1)
                userContext.setScore(lb[i].score)
            }
            lb[i].rank = i + 1;
        }
        setData(lb)
    }


    return (
        <div style={{padding: "2% 4%"}}>
            <Typography.Title>Leaderboard</Typography.Title>
            <Typography.Title type={'secondary'} level={3}>{contest.name || ''}</Typography.Title>
            <br/>
            <Card style={{width: '12rem'}} bodyStyle={{padding: '12px 24px'}}>
                <div className={'ant-statistic'}>
                    <div className={'ant-statistic-title'}>
                        Current Rank
                    </div>
                    <div className={'ant-statistic-content'}>
                        <div className={'ant-statistic-content-prefix'}
                             style={{marginRight: '1rem'}}>
                            <TrophyOutlined/>
                        </div>
                        <div className={'ant-statistic-content-value'}>
                            {userContext.rank}
                        </div>
                    </div>
                    Score: {contest.user_score}/{contest.max_score}
                </div>
            </Card>
            <br/><br/><br/>
            <Table bordered
                   rowClassName={(record, index) => userContext.user !== null ? record.name === userContext.user.username ? 'table-row' : console.log(record) : null}

                   dataSource={data} columns={columns} loading={loading} pagination={false}/>
        </div>
    )
}

export default LeaderBoard
