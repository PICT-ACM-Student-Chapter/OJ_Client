import React, {useContext, useEffect, useState} from 'react'
import {Button, Card, Col, Row, Select, Skeleton, Space, Spin, Typography} from "antd";
import Editor from "@monaco-editor/react";
import ThemeContext from "../../context/ThemeContext";
import ReactMarkdown from 'react-markdown'
import './QuestionDetail.style.css'
import {Helmet} from "react-helmet";
import {LeftOutlined} from "@ant-design/icons";
import SplitPane from "react-split-pane";
import RunSubmit from "../../components/QuestionPage/RunSubmit.component";
import axios from "axios";

const {Option} = Select;

function QuestionDetail(props) {
    const theme = useContext(ThemeContext)
    const [editor, setEditor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tcsLoading, setTCsLoading] = useState(true);
    const [question, setQuestion] = useState({})
    const [languages, setLanguages] = useState([])
    const [currentLanguage, setCurrentLanguage] = useState({})
    let savedCodes = JSON.parse(localStorage.getItem(`codes${props.match.params.questionId}`) || '{}')

    useEffect(() => {
        (async function () {
            const reqConfig = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }

            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/questions/${props.match.params.questionId}`, reqConfig)
            console.log(res.data)

            setQuestion(res.data)
            setLoading(false)
            for (let i of res.data.test_cases) {
                const inpRes = await axios.get(i.input)
                i.input = inpRes.data
                const outRes = await axios.get(i.output)
                i.output = outRes.data
            }

            setQuestion(res.data)
            setTCsLoading(false)

            const resLanguages = await axios.get(`${process.env.REACT_APP_BASE_URL}/languages`)
            setLanguages(resLanguages.data.results)

            if (localStorage.getItem('preferredLanguage')) {
                for (let i of resLanguages.data.results)
                    if (i.id === parseInt(localStorage.getItem('preferredLanguage'))) {
                        setCurrentLanguage(i)
                    }
            } else
                setCurrentLanguage(resLanguages.data.results[0])
        })()
    }, [props.match.params.questionId])

    useEffect(() => {
        if (currentLanguage.id)
            localStorage.setItem('preferredLanguage', currentLanguage.id)
    }, [currentLanguage])

    function handleEditorMount(_, e) {
        setEditor(e)
        console.log(e)
        e.getModel().onDidChangeContent(_ => {
            savedCodes[parseInt(localStorage.getItem("preferredLanguage"))] = e.getModel().getValue()
            localStorage.setItem(`codes${props.match.params.questionId}`, JSON.stringify(savedCodes))
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
                    <Card className='question-card'>
                        <Space>
                            <Button icon={<LeftOutlined/>}
                                    onClick={_ => props.history.push(`/contests/${props.match.params.contestId}`)}>Back</Button>
                            <Typography.Title>{question.name || ''}</Typography.Title>
                        </Space>
                        <br/><br/>
                        <Skeleton loading={loading} paragraph={{rows: 20}} active/>
                        {!loading && <div>
                            <ReactMarkdown>{question.description}</ReactMarkdown>
                            <br/><br/>
                            <Typography.Title level={3}>Input Format</Typography.Title>
                            <ReactMarkdown>{question.input_format}</ReactMarkdown>
                            <Typography.Title level={3}>Output Format</Typography.Title>
                            <ReactMarkdown>{question.output_format}</ReactMarkdown>
                            <Typography.Title level={3}>Constraints</Typography.Title>
                            <ReactMarkdown>{question.output_format}</ReactMarkdown>
                            <br/>
                            <Typography.Title level={3}>Sample Testcase(s)</Typography.Title>
                            {
                                question.test_cases && question.test_cases.map(({input, output, id}) => (
                                        <div key={id}>
                                            <Row gutter={16}>
                                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                    <Card className='test-case-card' type="inner" loading={tcsLoading}
                                                          title={<Typography.Title level={4}>Input</Typography.Title>}
                                                        // extra={<a href="#">Copy</a>}
                                                    >
                                                        <pre>{input}</pre>
                                                    </Card>
                                                </Col>
                                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>

                                                    <Card className='test-case-card' type="inner" loading={tcsLoading}
                                                          title={<Typography.Title level={4}>Output</Typography.Title>}
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
                        </div>}


                    </Card>
                </div>
                <div>
                    <Card style={{marginBottom: '16px', position: 'relative'}} className='button-group-card'>

                        <Select style={{width: 120}} size='large' value={currentLanguage.id}
                                onChange={handleSelectLanguage}>
                            {languages.map(lang => <Option value={lang.id}>{lang.name}</Option>)}
                        </Select>
                    </Card>
                    <div style={{position: 'relative', height: '88vh'}}>
                        <div style={{width: '100%', position: 'absolute'}}>
                            <Card width={'100%'} className={'editor-card'}
                                  style={{height: '71vh'}}>
                                <Editor
                                    loading={<Spin size={'large'} tip={'Loading Editor'}/>}
                                    language={currentLanguage.monaco_lang_code}
                                    theme={theme.theme}
                                    editorDidMount={handleEditorMount}
                                    options={{
                                        fontSize: 16,
                                    }}
                                />
                            </Card>
                        </div>
                        <RunSubmit match={props.match} getCode={getCode} getLang={_ => currentLanguage}/>
                    </div>
                </div>
            </SplitPane>
        </div>

    )
}

export default QuestionDetail
