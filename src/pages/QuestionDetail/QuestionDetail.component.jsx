import React, {useContext, useEffect, useState} from 'react'
import {Breadcrumb, Button, Card, Col, Input, Row, Select, Skeleton, Space, Spin, Statistic, Typography} from "antd";
import Editor from "@monaco-editor/react";
import ThemeContext from "../../context/ThemeContext";
import './QuestionDetail.style.css'
import {Helmet} from "react-helmet";
import {
    BarChartOutlined,
    CaretRightOutlined,
    HourglassOutlined,
    LoadingOutlined,
    ProfileOutlined
} from "@ant-design/icons";
import SplitPane from "react-split-pane";
import RunSubmit from "../../components/QuestionPage/RunSubmit.component";
import MarkdownMathJaxComponent from "../../components/MarkdownMathJax.component";
import GlobalContext from "../../context/GlobalContext";
import {b64Decode, b64Encode, sleep} from "../../utils/utils";
import axios from "axios";
import {Link} from "react-router-dom";

const {Option} = Select;
const {Countdown} = Statistic;

const RUN_INTERVAL = 1  // In secs


function QuestionDetail(props) {

    const globalContext = useContext((GlobalContext))
    const theme = useContext(ThemeContext)
    const [editor, setEditor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tcsLoading, setTCsLoading] = useState(true);
    // eslint-disable-next-line
    const [started, setStarted] = useState(false)

    const [isReverseCode, setIsReverseCode] = useState(false)
    const [inputRC, setInputRC] = useState("")
    // const [languages, setLanguages] = useState([])
    const [currentLanguage, setCurrentLanguage] = useState({})
    const [inputTC, setInputTC] = useState(null)

    const {languages, getAllLanguages, getQuestionDetail, question, setIsContestLive} = globalContext
    const [runRc, setRunRc] = useState(false)
    const [outputRC, setOutputRC] = useState("")
    const [linkTo, setLinkTo] = useState("")

    const {contest, allQuestions} = globalContext

    let savedCodes = JSON.parse(localStorage.getItem(`codes${props.match.params.questionId}`) || '{}')


    useEffect(() => {

        setLinkTo(`/contests/${props.match.params.contestId}`)
        console.log(question)
        getAllLanguages()
        getQuestionDetail(props.match.params.questionId, setLoading, setTCsLoading, setCurrentLanguage)
        globalContext.getContestDetail(props.match.params.contestId, setStarted, setStarted)
        isReverseCoding()
        // eslint-disable-next-line
    }, [props.match.params.questionId])

    useEffect(() => {
        if (currentLanguage.id)
            localStorage.setItem('preferredLanguage', currentLanguage.id)
    }, [currentLanguage])

    const isReverseCoding = (question) => {

        allQuestions.map((question) => {

            if (question.id === props.match.params.questionId) {
                setIsReverseCode(question.contest_que.is_reverse_coding)
            }
            return null
        })

    }


    function handleEditorMount(_, e) {
        setEditor(e)
        console.log(e)
        e.getModel().onDidChangeContent(_ => {
            if (e.getModel().getValue() !== "") {
                savedCodes[parseInt(localStorage.getItem("preferredLanguage"))] = e.getModel().getValue()
                localStorage.setItem(`codes${props.match.params.questionId}`, JSON.stringify(savedCodes))
            }
        })
    }


    useEffect(() => {
        if (editor) {
            editor.getModel().setValue(savedCodes[currentLanguage.id] || '')
        }
    }, [currentLanguage, editor, savedCodes])

    function getCode() {
        return editor.getModel().getValue()
    }

    function handleSelectLanguage(v) {
        for (let i of languages) {
            if (v === i.id) {
                setCurrentLanguage(i)
            }
        }
    }

    const funcInputTC = () => {
        setInputTC(null)
    }

    const checkRCRun = async (id) => {
        const reqConfig = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        // /contests/{contest_id}/questions/{ques_id}/rc/run/{id}
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/contests/${props.match.params.contestId}/questions/${props.match.params.questionId}/rc/run/${id}`, reqConfig)
        console.log(res.data)
        if (res.data.status === 'IN_QUEUE') {
            await sleep(RUN_INTERVAL * 1000);
            checkRCRun(id)
        } else {
            setRunRc(false)
            setOutputRC(b64Decode(res.data.stdout))
        }
    }

    const handleRCRun = async () => {

        setRunRc(true)

        const data = {
            stdin: b64Encode(inputRC)
        }
        const reqConfig = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        try {
            console.log(props.match.params.questionId)
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/contests/${props.match.params.contestId}/questions/${props.match.params.questionId}/rc/run`, data, reqConfig)
            const subId = res.data.id

            checkRCRun(subId)

        } catch (e) {

            setRunRc(false)
        }
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>{`${loading ? 'Loading Question...' : question.name} - PASC OJ`}</title>
                <link rel="canonical" href="http://mysite.com/example"/>
            </Helmet>
            <SplitPane split={'vertical'} defaultSize={'50%'} minSize={400} maxSize={-400}
                       style={{position: "relative", width: '100%', height: '88vh', overflowY: 'hidden'}}>
                <div>
                    <Card className='question-card' title={<>
                        <Row justify="space-around" align="middle" style={{borderBottom: "0.5px solid #333333"}}>
                            <Col>
                                <Breadcrumb style={{fontSize: "large"}}>
                                    <Breadcrumb.Item>
                                        <Link to={{pathname: linkTo}}>Questions</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        <span>{question.name || ""}</span>
                                    </Breadcrumb.Item>

                                </Breadcrumb>
                            </Col>
                        </Row>
                        <br/>
                        <Row justify="space-around" align="middle">
                            <Col span={16}>
                                <Typography.Title>{question.name || ""}</Typography.Title>
                            </Col>
                            <Col align='right' span={8}>
                                {
                                    contest ? <Card style={{width: '12rem'}} bodyStyle={{padding: '12px 24px'}}>
                                        <Countdown prefix={<HourglassOutlined/>} title="Time Left"
                                                   value={contest.end_time} onFinish={_ => {
                                            setIsContestLive(false)
                                        }}/>
                                        Ends: {new Date(contest.end_time).toLocaleTimeString()}
                                    </Card> : null
                                }
                            </Col>
                        </Row>
                    </>
                    }>

                        <Skeleton loading={loading} paragraph={{rows: 20}} active/>
                        {!loading && <div>
                            <MarkdownMathJaxComponent
                                className='markdown'>{question.description}</MarkdownMathJaxComponent>
                            <br/>
                            <Typography.Title level={3}>Input Format</Typography.Title>
                            <MarkdownMathJaxComponent
                                className='markdown'>{question.input_format}</MarkdownMathJaxComponent>
                            <Typography.Title level={3}>Output Format</Typography.Title>
                            <MarkdownMathJaxComponent
                                className='markdown'>{question.output_format}</MarkdownMathJaxComponent>
                            <Typography.Title level={3}>Constraints</Typography.Title>
                            <MarkdownMathJaxComponent
                                className='markdown'>{question.constraints}</MarkdownMathJaxComponent>
                            <br/>

                            {isReverseCode &&
                            <>
                                <Typography.Title level={3}>Run Testcase</Typography.Title>
                                <br/>
                                <Row gutter={24}>
                                    <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                                        <Input.TextArea
                                            placeholder="    ENTER INPUT HERE"
                                            disabled={runRc}
                                            onChange={(e) => {
                                                setInputRC(e.target.value)
                                            }}
                                            autoSize={{minRows: 1, maxRows: 7}}
                                            style={{fontFamily: "monospace", fontSize: "17px"}}
                                            required
                                        />
                                    </Col>

                                    <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                        <Button disabled={runRc || !inputRC}
                                                size='large'
                                                type='primary'
                                                onClick={() => {
                                                    handleRCRun()
                                                }}
                                                style={{width: "100%"}}
                                        >
                                            {runRc ? <LoadingOutlined/> : <CaretRightOutlined/>}
                                            Run
                                        </Button>
                                    </Col>

                                </Row>
                                <br/>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Input.TextArea placeholder="    OUTPUT SHOWN HERE"
                                                        value={outputRC}
                                                        readonly
                                                        autoSize={{minRows: 1, maxRows: 7}}
                                                        style={{fontFamily: "monospace", fontSize: "17px"}}

                                        />


                                    </Col>
                                </Row>

                            </>
                            }
                            <br/><br/>
                            <>

                                <Typography.Title level={3}>Sample Testcase(s)</Typography.Title>
                                {
                                    question.test_cases && question.test_cases.map(({input, output, id}) => (
                                            <div key={id}>
                                                <Row gutter={16}>
                                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                        <Card className='test-case-card' type="inner"
                                                              loading={tcsLoading}
                                                              title={<Typography.Title
                                                                  level={4}>Input</Typography.Title>}
                                                              extra={<Button disabled={inputTC} onClick={() => {
                                                                  setInputTC(input)
                                                              }}>
                                                                  {inputTC ? <LoadingOutlined/> : <CaretRightOutlined/>}
                                                                  Run
                                                              </Button>
                                                              }
                                                        >
                                                            <pre>{input}</pre>
                                                        </Card>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>

                                                        <Card className='test-case-card' type="inner"
                                                              loading={tcsLoading}
                                                              title={<Typography.Title
                                                                  level={4}>Output</Typography.Title>}
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
                            </>


                        </div>
                        }


                    </Card>
                </div>
                <div>
                    <Card style={{marginBottom: '16px', position: 'relative'}} className='button-group-card'>
                        <Row justify="space-around" align="middle">
                            <Col span={12}>
                                Languages: &nbsp;
                                {
                                    languages ? <Select style={{width: 120}} size='large' value={currentLanguage.id}
                                                        onChange={handleSelectLanguage}>
                                        {languages.map(lang => <Option value={lang.id}>{lang.name}</Option>)}
                                    </Select> : null
                                }

                            </Col>
                            <Col align='right' span={12}>
                                <Space>
                                    <Link
                                        to={`${props.location.pathname}/submissions?name=${question.name}&back=${props.location.pathname}`}>

                                        <Button
                                            icon={<ProfileOutlined/>} size={'medium'}>My Submissions</Button></Link>
                                    <Link to={`/leaderboard/${props.match.params.contestId}`}><Button
                                        icon={<BarChartOutlined/>} type='primary'
                                        size={'medium'}>Leaderboard</Button></Link>
                                </Space>

                            </Col>
                        </Row>

                    </Card>
                    <div style={{position: 'relative', height: '88vh'}}>
                        <div style={{width: '100%', position: 'absolute'}}>
                            <Card width={'100%'} className={'editor-card'}
                                  style={{height: '71vh'}}>
                                {JSON.stringify(currentLanguage) === '{}' ? <></> :
                                    <Editor
                                        loading={<Spin size={'large'} tip={'Loading Editor'}/>}
                                        language={currentLanguage.monaco_lang_code}
                                        theme={theme.theme}
                                        editorDidMount={handleEditorMount}
                                        options={{
                                            fontSize: 16,
                                        }}
                                    />
                                }
                            </Card>
                        </div>
                        <RunSubmit match={props.match} getCode={getCode} getLang={_ => currentLanguage}
                                   inputTC={inputTC} funcInputTC={funcInputTC}/>
                    </div>
                </div>
            </SplitPane>
        </div>

    )
}

export default QuestionDetail
