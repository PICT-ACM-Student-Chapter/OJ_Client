import React, { useContext, useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Input,
  message,
  Row,
  Select,
  Skeleton,
  Space,
  Spin,
  Statistic,
  Typography,
} from "antd";
import Editor from "@monaco-editor/react";
import ThemeContext from "../../context/ThemeContext";
import "./QuestionDetail.style.css";
import { Helmet } from "react-helmet";
import {
  BarChartOutlined,
  CaretRightOutlined,
  HistoryOutlined,
  HourglassOutlined,
  LeftOutlined,
  LoadingOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import SplitPane from "react-split-pane";
import RunSubmit from "../../components/QuestionPage/RunSubmit.component";
import MarkdownMathJaxComponent from "../../components/MarkdownMathJax.component";
import GlobalContext from "../../context/GlobalContext";
import { b64Decode, b64Encode, sleep } from "../../utils/utils";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const { Option } = Select;
const { Countdown } = Statistic;

const RUN_INTERVAL = 1; // In secs

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function QuestionDetail(props) {
  const globalContext = useContext(GlobalContext);
  const theme = useContext(ThemeContext);
  const [editor, setEditor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tcsLoading, setTCsLoading] = useState(true);
  // eslint-disable-next-line
  const [started, setStarted] = useState(false);

  const [isReverseCode, setIsReverseCode] = useState(false);
  const [isBugoff, setIsBugoff] = useState(false);
  const [inputRC, setInputRC] = useState("");
  // const [languages, setLanguages] = useState([])
  const [currentLanguage, setCurrentLanguage] = useState({});
  const [inputTC, setInputTC] = useState(null);

  const {
    languages,
    getAllLanguages,
    getQuestionDetail,
    question,
    setIsContestLive,
    getBugoffQuestionDetails,
    bugoffDetails,
  } = globalContext;
  const [runRc, setRunRc] = useState(false);
  const [outputRC, setOutputRC] = useState("");
  const [linkTo, setLinkTo] = useState("");

  const { contest, allQuestions, getAllQuestions } = globalContext;

  let savedCodes = JSON.parse(
    localStorage.getItem(`codes${props.match.params.questionId}`) || "{}"
  );

  useEffect(() => {
    setLinkTo(`/contests/${props.match.params.contestId}`);
    console.log(question);
    getAllLanguages();
    getQuestionDetail(
      props.match.params.questionId,
      setLoading,
      setTCsLoading,
      setCurrentLanguage
    );
    globalContext.getContestDetail(
      props.match.params.contestId,
      setStarted,
      setStarted
    );
    isReverseCoding();
    // eslint-disable-next-line
  }, [props.match.params.questionId]);

  useEffect(() => {
    console.log("HOLAA")
    getAllLanguages();
    getBugoffQuestionDetails(
      props.match.params.questionId,
      setLoading,
      setTCsLoading,
      setCurrentLanguage
    );
  }, [isBugoff]);

  useEffect(() => {
    console.log("Updated Hack Details", bugoffDetails);
  }, [bugoffDetails]);

  useEffect(() => {
    if (currentLanguage.id) {
      localStorage.setItem("preferredLanguage", currentLanguage.id);
      getAllLanguages();
      getBugoffQuestionDetails(
        props.match.params.questionId,
        setLoading,
        setTCsLoading,
        setCurrentLanguage
      );
    }
  }, [currentLanguage]);

  useEffect(() => {
    isReverseCoding();
    checkIsBugoff();
    // eslint-disable-next-line
  }, [allQuestions]);

  const checkIsBugoff = () => {
    if (allQuestions.length === 0) {
      getAllQuestions(props.match.params.contestId, () => {});
      return;
    }

    allQuestions.map((question) => {
      if (question.id === props.match.params.questionId) {
        setIsBugoff(question.contest_que.is_bugoff);
      }
      return null;
    });
  };

  const isReverseCoding = () => {
    if (allQuestions.length === 0) {
      getAllQuestions(props.match.params.contestId, () => {});
      return;
    }

    allQuestions.map((question) => {
      if (question.id === props.match.params.questionId) {
        setIsReverseCode(question.contest_que.is_reverse_coding);
      }
      return null;
    });
  };

  function handleEditorMount(_, e) {
    setEditor(e);
    console.log(e);
    e.getModel().onDidChangeContent((_) => {
      if (e.getModel().getValue() !== "") {
        savedCodes[parseInt(localStorage.getItem("preferredLanguage"))] = e
          .getModel()
          .getValue();
        localStorage.setItem(
          `codes${props.match.params.questionId}`,
          JSON.stringify(savedCodes)
        );
      }
    });
  }

  useEffect(() => {
    if (editor) {
      editor.getModel().setValue(savedCodes[currentLanguage.id] || "");
    }
  }, [currentLanguage, editor, savedCodes]);

  function getCode() {
    return editor.getModel().getValue();
  }

  function handleSelectLanguage(v) {
    for (let i of languages) {
      if (v === i.id) {
        setCurrentLanguage(i);
      }
    }
  }

  const funcInputTC = () => {
    setInputTC(null);
  };

  const checkRCRun = async (id) => {
    const reqConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    // /contests/{contest_id}/questions/{ques_id}/rc/run/{id}
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/contests/${props.match.params.contestId}/questions/${props.match.params.questionId}/rc/run/${id}`,
      reqConfig
    );
    console.log(res.data);
    if (res.data.status === "IN_QUEUE") {
      await sleep(RUN_INTERVAL * 1000);
      checkRCRun(id);
    } else {
      setRunRc(false);
      setOutputRC(b64Decode(res.data.stdout));
    }
  };

  const handleRCRun = async () => {
    setRunRc(true);

    const data = {
      stdin: b64Encode(inputRC),
    };
    const reqConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      console.log(props.match.params.questionId);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/contests/${props.match.params.contestId}/questions/${props.match.params.questionId}/rc/run`,
        data,
        reqConfig
      );
      const subId = res.data.id;

      checkRCRun(subId);
    } catch (e) {
      if (e?.response?.status === 429) {
        message.error(
          "Too fast? Maximum Runs limit per minute exceeded. Please try after a minute"
        );
      }
      setRunRc(false);
    }
  };

  let query = useQuery();
  //On reset click
  const onReset=()=>{
    const resetcode=localStorage.getItem("incorrect_code" + props.match.params.questionId)
    editor.getModel().setValue(resetcode || "");
  }


  
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${
          loading ? "Loading Question..." : question.name
        } - PASC OJ`}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <SplitPane
        split={"vertical"}
        defaultSize={"50%"}
        minSize={400}
        maxSize={-400}
        style={{
          position: "relative",
          width: "100%",
          height: "90.5vh",
          overflow: "hidden",
        }}
        paneStyle={{
          overflow: "scroll" 
        }}
      >
        <div>
          <Card
            className="question-card"
            title={
              <>
                {query.get("back") ? (
                  <Button
                    icon={<LeftOutlined />}
                    onClick={() => {
                      props.history.push(`${query.get("back")}`);
                    }}
                  >
                    Back
                  </Button>
                ) : (
                  <>
                    <Button
                      icon={<LeftOutlined />}
                      onClick={() => {
                        props.history.push(`${linkTo}`);
                      }}
                    >
                      Back
                    </Button>
                  </>
                )}
                <Row justify="space-around" align="middle">
                  <Col>
                    <Breadcrumb separator=">" style={{ fontSize: "x-large" }}>
                      <Breadcrumb.Item>
                        <Link to={{ pathname: linkTo }}>Questions</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <Typography.Title level={3}>
                          {question.name || ""}
                        </Typography.Title>
                       
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </Col>
                </Row>
                <br />
                <div
                  style={{
                    borderBottom: "0.5px solid #333330",
                  }}
                ></div>
                <br />
                <Row justify="space-around" align="middle">
                  <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                    <Typography.Title>{question.name || ""}</Typography.Title>
                  </Col>
                  <Col align="right" xs={24} sm={24} md={24} lg={8} xl={8}>
                    {contest ? (
                      <Card
                        style={{ width: "12rem" }}
                        bodyStyle={{
                          padding: "12px 24px",
                        }}
                      >
                        <Countdown
                          prefix={<HourglassOutlined />}
                          title="Time Left"
                          value={contest.end_time}
                          onFinish={(_) => {
                            setIsContestLive(false);
                          }}
                        />
                        Ends: {new Date(contest.end_time).toLocaleTimeString()}
                      </Card>
                    ) : null}
                  </Col>
                </Row>
              </>
            }
          >
            <Skeleton loading={loading} paragraph={{ rows: 20 }} active />
            {!loading && (
              <div>
                <MarkdownMathJaxComponent className="markdown">
                  {question.description}
                </MarkdownMathJaxComponent>
                <br />
                <Typography.Title level={3}>Input Format</Typography.Title>
                <MarkdownMathJaxComponent className="markdown">
                  {question.input_format}
                </MarkdownMathJaxComponent>
                <Typography.Title level={3}>Output Format</Typography.Title>
                <MarkdownMathJaxComponent className="markdown">
                  {question.output_format}
                </MarkdownMathJaxComponent>
                <Typography.Title level={3}>Constraints</Typography.Title>
                <MarkdownMathJaxComponent className="markdown">
                  {question.constraints}
                </MarkdownMathJaxComponent>
                <br />

                {isReverseCode && (
                  <div style={{ padding: "0.5rem" }}>
                    <Typography.Title level={3}>Run Testcase</Typography.Title>
                    <br />
                    <Row gutter={24} justify="space-around" align="middle">
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Input.TextArea
                          placeholder="    ENTER INPUT HERE"
                          disabled={runRc}
                          onChange={(e) => {
                            setInputRC(e.target.value);
                          }}
                          autoSize={{
                            minRows: 1,
                            maxRows: 7,
                          }}
                          style={{
                            fontFamily: "monospace",
                            fontSize: "17px",
                          }}
                          required
                        />
                      </Col>

                      <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Button
                          disabled={runRc || !inputRC}
                          size="large"
                          type="primary"
                          onClick={() => {
                            handleRCRun();
                          }}
                          style={{ width: "100%" }}
                        >
                          {runRc ? <LoadingOutlined /> : <CaretRightOutlined />}
                          Run
                        </Button>
                      </Col>
                    </Row>
                    <br />
                    <Row justify="space-around" align="middle">
                      <Col xs={24} sm={24} md={22} lg={22} xl={22}>
                        <Input.TextArea
                          placeholder="    OUTPUT SHOWN HERE"
                          value={outputRC}
                          readonly
                          autoSize={{
                            minRows: 1,
                            maxRows: 7,
                          }}
                          style={{
                            fontFamily: "monospace",
                            fontSize: "17px",
                          }}
                        />
                      </Col>
                    </Row>
                  </div>
                )}
                <br />
                <br />
                <>
                  <Typography.Title level={3}>
                    Sample Testcase(s)
                  </Typography.Title>
                  {question.test_cases &&
                    question.test_cases.map(({ input, output, id }) => (
                      <div key={id}>
                        <Row gutter={16}>
                          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <Card
                              className="test-case-card"
                              type="inner"
                              loading={tcsLoading}
                              title={
                                <Typography.Title level={4}>
                                  Input
                                </Typography.Title>
                              }
                              extra={
                                <Button
                                  disabled={inputTC}
                                  onClick={() => {
                                    setInputTC(input);
                                  }}
                                >
                                  {inputTC ? (
                                    <LoadingOutlined />
                                  ) : (
                                    <CaretRightOutlined />
                                  )}
                                  Run
                                </Button>
                              }
                            >
                              <pre>{input}</pre>
                            </Card>
                          </Col>
                          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <Card
                            style={{overflow:"scroll"}}
                              className="test-case-card"
                              type="inner"
                              loading={tcsLoading}
                              title={
                                <Typography.Title level={4}>
                                  Output
                                </Typography.Title>
                              }
                              // extra={<a href="#">Copy</a>}
                            >
                              <pre>{output}</pre>
                            </Card>
                          </Col>
                        </Row>
                        <br />
                      </div>
                    ))}
                </>
              </div>
            )}
          </Card>
        </div>
        <div>
          <Card
            style={{ marginBottom: "16px", position: "relative"}}
            className="button-group-card"
          >
            <Row justify="space-around" align="middle">
              <Col span={8}>
                Languages: &nbsp;
                {languages ? (
                  <Select
                    style={{ width: 120 }}
                    size="large"
                    value={currentLanguage.id}
                    onChange={handleSelectLanguage}
                  >
                    {languages.map((lang) => (
                      <Option value={lang.id}>{lang.name}</Option>
                    ))}
                  </Select>
                ) : null}
              </Col>
              <Col align="right" span={16}>
                <Space>
                  <Link
                    to={`${props.location.pathname}/submissions?name=${question.name}&back=${props.location.pathname}`}
                  >
                    {/* <HistoryOutlined /> */}
                    <Button icon={<ProfileOutlined />} size={"medium"}>
                      My Submissions
                    </Button>
                  </Link>
                  <Link
                    to={`/leaderboard/${props.match.params.contestId}?back=${props.location.pathname}`}
                  >
                    <Button
                      icon={<BarChartOutlined />}
                      type="primary"
                      size={"medium"}
                    >
                      Leaderboard
                    </Button>
                  </Link>
                {
                  isBugoff?  <Button icon={<HistoryOutlined />} onClick={onReset} size={"medium"}>Reset</Button>:<></>
                }
                </Space>
              </Col>
            </Row>
          </Card>
          <div style={{ position: "relative", height: "88vh" }}>
            <div style={{ width: "100%", position: "absolute" }}>
              <Card
                width={"100%"}
                className={"editor-card"}
                style={{ height: "66vh" }}
              >
                {JSON.stringify(currentLanguage) === "{}" ? (
                  <div
                    style={{
                      position: "absolute",
                      top: "10%",
                      left: "20%",
                      tranform: "translate(-50%,-50%)",
                    }}
                  >
                    <h1
                      style={{
                        fontSize: "x-large",
                        marginLeft: "15%",
                      }}
                    >
                      Please Select a language
                    </h1>
                    <br />
                    <img src="/select.svg" alt="" style={{ width: "80%" }} />
                  </div>
                ) : (
                  <Editor
                    loading={<Spin size={"large"} tip={"Loading Editor"} />}
                    language={currentLanguage.monaco_lang_code}
                    theme={theme.theme === "dark" ? "vs-dark":"vs-light"}
                    editorDidMount={handleEditorMount}
                    options={{
                      fontSize: 16,
                    }}
                  />
                )}
              </Card>
            </div>
            <RunSubmit
              match={props.match}
              getCode={getCode}
              getLang={(_) => currentLanguage}
              inputTC={inputTC}
              funcInputTC={funcInputTC}
            />
          </div>
        </div>
      </SplitPane>
    </div>
  );
}

export default QuestionDetail;
