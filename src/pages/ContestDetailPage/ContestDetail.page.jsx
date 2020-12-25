import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Divider, Row, Space, Statistic, Tabs, Tag, Typography} from 'antd';
import {HourglassOutlined} from '@ant-design/icons'
import axios from "axios";
import {useParams} from "react-router";
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import ProSkeleton from '@ant-design/pro-skeleton';
import {Link} from "react-router-dom";
import StartContestComponent from "../../components/ContestDetailPage/StartContest.component";
import MiniLeaderBoard from "../../components/ContestDetailPage/MiniLeaderBoard";
import '../../components/ContestDetailPage/ContestDetail.css'

const {TabPane} = Tabs;
const {Countdown} = Statistic;
const {Title} = Typography

// const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK


const ContestDetail = (props) => {
    let {contestId} = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [contest, setContest] = useState(null)
    const [started, setStarted] = useState(localStorage.getItem(`contestStarted${contestId}`) || false)

    useEffect(() => {
        getContestDetail()
        // eslint-disable-next-line
    }, [])

    const getContestDetail = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/contests/${contestId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(
            (res) => {
                console.log(res.data)
                setContest(res.data)
            }
        )
            .then(() => {
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function startContest() {
        localStorage.setItem(`contestStarted${contestId}`, true)
        setStarted(true)
    }

    return (
        isLoading ?
            <ProSkeleton key={1}/> :

            <div style={{'padding': '2% 4%'}}>
                <Row gutter={[0, 24]}>
                    <Col span={12}>
                        <Title>{contest.name}</Title>
                    </Col>
                    <Col span={12} align='right'>
                        <Row align='right'>
                            <Col span={16}>
                                <Card style={{width: '12rem'}} bodyStyle={{padding: '12px 24px'}}>
                                    <Countdown prefix={<HourglassOutlined/>} title="Time Left"
                                               value={contest.end_time}/>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card style={{width: '12rem'}} bodyStyle={{padding: '12px 24px'}}>
                                    <Countdown prefix={<HourglassOutlined/>} title="Time Left"
                                               value={contest.end_time}/>
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

                                    {contest.questions.map((ques) => (
                                        <Row key={ques.question.id} align="middle" justify="center">
                                            <Col span={24}>
                                                <Card bordered={false}>
                                                    <Row align="middle">
                                                        <Col lg={12} onClick={() => {
                                                            props.history.push(`/contests/${contestId}/${ques.question.id}`)
                                                        }}>
                                                            <h2><Link
                                                                to={`/contests/${contestId}/${ques.question.id}`}> {ques.question.name}</Link>
                                                            </h2>
                                                        </Col>
                                                        <Col lg={12} align={'right'}>
                                                            <Space size={'middle'}>
                                                                <Tag color='blue'
                                                                     style={{'fontSize': 'larger', padding: '0.4rem'}}>
                                                                    Score: {ques.question.score}
                                                                </Tag>
                                                                <Link
                                                                    to={`/contests/${contestId}/${ques.question.id}`}>
                                                                    <Button size='large' type={'primary'}>
                                                                        Solve
                                                                    </Button>
                                                                </Link>
                                                                <Link
                                                                    to={`/contests/${contestId}/${ques.question.id}/submissions?name=${ques.question.name}`}>
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
                                    <div style={{fontSize: 'medium'}} id={'instruction-wrapper'}><ReactMarkdown
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
    )
}


export default ContestDetail


// const children =
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
