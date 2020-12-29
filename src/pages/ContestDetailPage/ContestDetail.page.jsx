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

const {TabPane} = Tabs;
const {Countdown} = Statistic;
const {Title} = Typography


const ContestDetail = (props) => {
    const userContext = useContext(UserContext);

    let {contestId} = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [contest, setContest] = useState(null)
    const [started, setStarted] = useState(false)
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        getContestDetail()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (started) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/contests/${contestId}/questions`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                console.log(res.data)
                setQuestions(res.data)
            })
        }
    }, [started, contestId])

    const getContestDetail = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/contests/${contestId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(
            (res) => {
                console.log(res.data)
                res.data.questions = []
                setContest(res.data)
                if (res.data.status === 'STARTED') {
                    setStarted(true)
                }
            }
        )
            .then(() => {
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    async function startContest() {
        await axios.patch(`${process.env.REACT_APP_BASE_URL}/contests/${contest.id}/start`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        setStarted(true)
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{`${isLoading ? 'Loading Contest...' : contest.name} - PASC OJ`}</title>
                <link rel="canonical" href="http://mysite.com/example"/>
            </Helmet>
            {isLoading ?
                <ProSkeleton key={1}/> :

                <div style={{'padding': '2% 4%'}}>
                    <Row gutter={[0, 24]}>
                        <Col span={12}>
                            <Title>{contest.name}</Title>
                        </Col>
                        <Col span={12} align='right'>
                            <Row align='right'>
                                <Col span={16}>
                                    {userContext.rank && <Card style={{width: '12rem'}} bodyStyle={{padding: '12px 24px'}}>
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
                                    </Card>}
                                </Col>
                                <Col span={8}>
                                    <Card style={{width: '12rem'}} bodyStyle={{padding: '12px 24px'}}>
                                        <Countdown prefix={<HourglassOutlined/>} title="Time Left"
                                                   value={contest.end_time}/>
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

                                        {questions.map((ques) => (
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
                                        ))}


                                    </TabPane>
                                    <TabPane tab="Instructions" key="2" style={{'padding': '4%'}}>
                                        <div style={{fontSize: 'medium'}} id={'instruction-wrapper'}>
                                            <MarkdownMathJaxComponent
                                                className="instructions"
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
                </div>}
        </>
    )
}


export default ContestDetail


// const children =
//
// {
//     guide: `# React App for Online Judge
// [![Netlify Status](https://api.netlify.com/api/v1/badges/055ae047-fa35-42db-a7b9-b55be8743512/deploy-status)](https://app.netlify.com/sites/fervent-bhabha-03f267/deploys)
//
// 🔥 Online Judge Platform of PICT ACM Student Chapter
//
// ## Guide to use the repo
//
// After you clone the repo you need to install necessary node modules, use below command to download them :
//
// ### \`yarn install\` or \`npm install\`
//
// To start the react server you need to run following command :
//
// ### \`yarn start\` or \`npm start\`
//
// This runs the app in the development mode.\\
// Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
//
// The page will reload if you make edits.\\
// You will also see any lint errors in the console.
//
// ## CI/CD pipeline
//
// Main branch is configured to automatically deploy on netlify. You can visit the domain below to access deployed website.
//
// ### \`https://fervent-bhabha-03f267.netlify.app/\` or \`www.onlinejudge.ml\`
// .`
// }
