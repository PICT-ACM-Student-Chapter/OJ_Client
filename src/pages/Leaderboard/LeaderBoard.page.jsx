import {Button, Card, Col, Row, Table, Tag, Typography} from 'antd'
import React, {useContext, useEffect, useState} from 'react'
import axios from "axios";
import UserContext from "../../context/User";
import "./leaderboard.css"
import {LeftOutlined, TrophyOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import {useLocation} from "react-router";

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

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function LeaderBoard(props) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [columns, setColumns] = useState(defaultCols)
    const [totalScore, setTotalScore] = useState('')

    const userContext = useContext(UserContext);
    const globalContext = useContext(GlobalContext);

    useEffect(() => {
        if (userContext.user !== null) {
            getLeaderBoard()
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
                generateColumns(res.data.questions)
                generateData(res.data.results)
            })
            .catch(e => {
                console.log(e.data)
            })
    }


    const generateColumns = (questions) => {
        // col = a copy of defaultCols
        let col = [...defaultCols];

        // questions.sort((a, b) => parseInt(a.order) - parseInt(b.order))

        let scoreSum = 0

        questions.forEach((que, i) => {

            console.log(que)
            scoreSum += que.score
            //Set Column for leaderboard table
            col.push({
                title: <Link to={`/contests/${props.match.params.contestId}/${que.id}`}><Typography.Title
                    level={5}>{`${que.id}`}</Typography.Title></Link>,
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
                setTotalScore(scoreSum)
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
    let query = useQuery();


    return (
        <div style={{padding: "2% 4%"}}>
            {query.get('back') ?
                <Button icon={<LeftOutlined/>} onClick={
                    () => {

                        props.history.push(`${query.get('back')}`)
                    }
                }>Back</Button>

                :
                <></>
            }
            <br/><br/>
            <Row justify="space-around" align="middle">
                <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                    <Typography.Title>Leaderboard</Typography.Title>
                    <Typography.Title type={'secondary'}
                                      level={3}>{globalContext.contest?.name || props.match.params.contestId || ''}</Typography.Title>
                </Col>
                <Col align="right" xs={24} sm={24} md={10} lg={10} xl={10}>
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
                            Score: {userContext.score}/{totalScore || ''}
                        </div>
                    </Card>
                </Col>
            </Row>
            <br/><br/>
            <b>*Updated every minute</b>
            <br/>
            <Table bordered
                   rowClassName={(record, index) => userContext.user !== null ? record.name === userContext.user.username ? 'table-row' : console.log(record) : null}
                   style={{overflowX: 'scroll'}}
                   dataSource={data} columns={columns} loading={loading} pagination={false}/>
        </div>
    )
}

export default LeaderBoard
