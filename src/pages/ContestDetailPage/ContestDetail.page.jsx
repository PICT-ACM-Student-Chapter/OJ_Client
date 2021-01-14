import React, {useContext, useEffect, useState} from 'react'
import {Button, Card, Col, Divider, Row, Space, Statistic, Tabs, Tag, Typography} from 'antd';
import {HourglassOutlined, TrophyOutlined} from '@ant-design/icons'
import axios from "axios";
import {useParams} from "react-router";
import gfm from 'remark-gfm'
import ProSkeleton from '@ant-design/pro-skeleton';
import {Link} from "react-router-dom";
import StartContestComponent from "../../components/ContestDetailPage/StartContest.component";
import MiniLeaderBoard from "../../components/ContestDetailPage/MiniLeaderBoard";
import '../../components/ContestDetailPage/ContestDetail.css'
import MarkdownMathJaxComponent from "../../components/MarkdownMathJax.component";

import {Helmet} from "react-helmet";
import UserContext from "../../context/User";
import GlobalContext from "../../context/GlobalContext";

const {TabPane} = Tabs;
const {Countdown} = Statistic;
const {Title} = Typography


const ContestDetail = (props) => {
    const userContext = useContext(UserContext);
    const globalContext = useContext(GlobalContext)
    let {contestId} = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [isQueLoading, setIsQueLoading] = useState(true)
    // const [contest, setContest] = useState(null)
    const [started, setStarted] = useState(false)
    const [questions, setQuestions] = useState([])

    const {contest, setIsContestLive} = globalContext
    useEffect(() => {
        globalContext.getContestDetail(contestId, setIsLoading)
        globalContext.getAllLanguages()

        // eslint-disable-next-line
    }, [])

    useEffect(()=>{
        let contests = globalContext.contests
        for (let c of contests){
            if(c.contest_id.id === contestId){
                if (c.status === 'STARTED'){
                    setStarted(true)
                }
                break;
            }
        }

    },[globalContext.contests,contestId])

    useEffect(() => {
        if (started) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/contests/${contestId}/questions`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                let ques = res.data
                ques.sort((a, b) => parseInt(a.contest_que.order) - parseInt(b.contest_que.order))
                setQuestions(ques)
                return ques
            })
                .then(ques=>{
                    setIsQueLoading(false)
                    }
                )
        }
    }, [started,contestId])

    async function startContest() {
        const res =await axios.patch(`${process.env.REACT_APP_BASE_URL}/contests/${contest.id}/start`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (res.data.status === 'STARTED'){
            let contests = globalContext.contests
            console.log('sdfdsfdf',contests)
            for (let c of contests){
                if(c.contest_id.id === contest.id){
                    c.status = 'STARTED'
                    await globalContext.setContests(contests)
                    break
                }
            }
            console.log('sdfdfdf',contests)
            setStarted(true)
        }
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{`${isLoading ? 'Loading Contest...' : contest.name} - PASC OJ`}</title>
                <link rel="canonical" href="http://mysite.com/example"/>
            </Helmet>
            {
                isLoading?"": <div style={{'padding': '2% 4%'}}>
                    <Row gutter={[0, 24]}>
                        <Col span={12}>
                            <Title>{contest.name}</Title>
                        </Col>
                        <Col span={12} align='right'>
                            <Row align='right'>
                                <Col span={16}>
                                    {userContext.rank &&
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
                                            Score: {userContext.score}/{contest.max_score}
                                        </div>
                                    </Card>}
                                </Col>
                                <Col span={8}>
                                    <Card style={{width: '12rem'}} bodyStyle={{padding: '12px 24px'}}>
                                        <Countdown prefix={<HourglassOutlined/>} title="Time Left"
                                                   value={contest.end_time} onFinish={_=>{setIsContestLive(false)}}/>
                                        Ends: {new Date(contest.end_time).toLocaleTimeString()}
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <br/>
                    {/*<Button type="primary" size='large' onClick={() => {*/
                    }
                    {/*    props.history.push(`/leaderboard/${contestId}`)*/
                    }
                    {/*}}>*/
                    }
                    {/*    Leaderboard*/
                    }
                    {/*</Button>*/
                    }

                    {
                        !started && <StartContestComponent contest={contest} startContest={startContest}/>
                    }
                    {
                        started && <><Row gutter={32}>
                            <Col xs={23} sm={23} md={23} lg={15} xl={15}>

                                <Tabs size='large' type="card">
                                    <TabPane tab="Questions" key="1" style={{'padding': '4%'}}>
                                        {
                                            isQueLoading ? <ProSkeleton/>:
                                                questions.map((ques) => (
                                                    <Row key={ques.id} gutter={[0, 18]} align="middle"
                                                         justify="center">
                                                        <Col span={24}>
                                                            <Card bordered={false}>
                                                                <Row align="middle">
                                                                    <Col lg={12} onClick={() => {
                                                                        props.history.push(`/contests/${contestId}/${ques.id}`)
                                                                    }}>
                                                                        <h2><Link
                                                                            to={`/contests/${contestId}/${ques.id}`}> {ques.name}</Link>
                                                                        </h2>
                                                                    </Col>
                                                                    <Col lg={12} align={'right'}>
                                                                        <Space size={'middle'}>
                                                                            <Tag
                                                                                color={ques.user_score.score === ques.score ? 'green' : 'blue'}
                                                                                style={{
                                                                                    'fontSize': 'larger',
                                                                                    padding: '0.4rem'
                                                                                }}>
                                                                                Score: {ques.user_score.score} / {ques.score}
                                                                            </Tag>
                                                                            <Link
                                                                                to={`/contests/${contestId}/${ques.id}`}>
                                                                                <Button size='large' type={'primary'}>
                                                                                    Solve
                                                                                </Button>
                                                                            </Link>
                                                                            <Link
                                                                                to={`/contests/${contestId}/${ques.id}/submissions?name=${ques.name}`}>
                                                                                <Button size='large'>
                                                                                    My Submissions
                                                                                </Button>
                                                                            </Link>
                                                                        </Space>
                                                                    </Col>
                                                                </Row>
                                                            </Card>
                                                        </Col>
                                                        <br/>
                                                    </Row>
                                                ))
                                        }
                                    </TabPane>
                                    <TabPane tab="Instructions" key="2" style={{'padding': '4%'}}>
                                        <div style={{fontSize: 'medium'}} id={'instruction-wrapper'}>
                                            <MarkdownMathJaxComponent
                                                className="markdown"
                                                plugins={[gfm]} children={contest.instructions}/></div>

                                    </TabPane>
                                </Tabs>
                            </Col>
                            <Col lg={1}>
                                <Divider type="vertical" style={{height: "100%"}}/>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                <MiniLeaderBoard match={props.match}/>
                            </Col>
                        </Row></>
                    }
                </div>
            }

        </>
    )
}


export default ContestDetail