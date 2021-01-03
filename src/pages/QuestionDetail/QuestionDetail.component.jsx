import React, {useContext, useEffect, useState} from 'react'
import {Button, Card, Col, Row, Select, Skeleton, Space, Spin, Typography} from "antd";
import Editor from "@monaco-editor/react";
import ThemeContext from "../../context/ThemeContext";
import './QuestionDetail.style.css'
import {Helmet} from "react-helmet";
import {CaretRightOutlined, LeftOutlined, LoadingOutlined} from "@ant-design/icons";
import SplitPane from "react-split-pane";
import RunSubmit from "../../components/QuestionPage/RunSubmit.component";
import MarkdownMathJaxComponent from "../../components/MarkdownMathJax.component";
import GlobalContext from "../../context/GlobalContext";

const {Option} = Select;

function QuestionDetail(props) {

    const globalContext = useContext((GlobalContext))
    const theme = useContext(ThemeContext)
    const [editor, setEditor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tcsLoading, setTCsLoading] = useState(true);
    // const [languages, setLanguages] = useState([])
    const [currentLanguage, setCurrentLanguage] = useState({})
    const [inputTC, setInputTC] = useState(null)

    const {languages, getAllLanguages, getQuestionDetail, question} = globalContext

    let savedCodes = JSON.parse(localStorage.getItem(`codes${props.match.params.questionId}`) || '{}')

    useEffect(() => {
        getAllLanguages()
        getQuestionDetail(props.match.params.questionId, setLoading, setTCsLoading, setCurrentLanguage)
        // (async function () {
        //     const reqConfig = {
        //         headers: {
        //             'Authorization': `Bearer ${localStorage.getItem('token')}`
        //         }
        //     }
        //
        //     try {
        //         const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/questions/${props.match.params.questionId}`, reqConfig)
        //         console.log(res.data)
        //
        //         setQuestion(res.data)
        //         setLoading(false)
        //         for (let i of res.data.test_cases) {
        //             const inpRes = await axios.get(i.input)
        //             i.input = inpRes.data
        //             const outRes = await axios.get(i.output)
        //             i.output = outRes.data
        //         }
        //
        //         setQuestion(res.data)
        //         setTCsLoading(false)
        //
        //         const resLanguages = await axios.get(`${process.env.REACT_APP_BASE_URL}/languages`)
        //         setLanguages(resLanguages.data)
        //
        //         if (localStorage.getItem('preferredLanguage')) {
        //             for (let i of resLanguages.data)
        //                 if (i.id === parseInt(localStorage.getItem('preferredLanguage'))) {
        //                     setCurrentLanguage(i)
        //                 }
        //         } else
        //             setCurrentLanguage(resLanguages.data[0])
        //     } catch (e) {
        //         console.log(e)
        //     }
        // })()
        // eslint-disable-next-line
    }, [props.match.params.questionId])

    useEffect(() => {
        if (currentLanguage.id)
            localStorage.setItem('preferredLanguage', currentLanguage.id)
    }, [currentLanguage])

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
                    <Card className='question-card' title={
                        <Space>
                            <Row>
                                <Col span={8}>
                                    <Button icon={<LeftOutlined/>}
                                            onClick={_ => props.history.push(`/contests/${props.match.params.contestId}`)}>Back</Button>
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;          &nbsp;
                                    &nbsp;
                                    &nbsp;          &nbsp;
                                    &nbsp;
                                    &nbsp;          &nbsp;
                                    &nbsp;
                                    &nbsp;          &nbsp;
                                    &nbsp;
                                    &nbsp;
                                </Col>
                                <Col span={16}>
                                    <Typography.Title>{question.name || ''}</Typography.Title>
                                </Col>
                            </Row>
                        </Space>
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
                            <Typography.Title level={3}>Sample Testcase(s)</Typography.Title>
                            {
                                question.test_cases && question.test_cases.map(({input, output, id}) => (
                                        <div key={id}>
                                            <Row gutter={16}>
                                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                    <Card className='test-case-card' type="inner" loading={tcsLoading}
                                                          title={<Typography.Title level={4}>Input</Typography.Title>}
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
                        <RunSubmit match={props.match} getCode={getCode} getLang={_ => currentLanguage}
                                   inputTC={inputTC} funcInputTC={funcInputTC}/>
                    </div>
                </div>
            </SplitPane>
        </div>

    )
}

export default QuestionDetail
