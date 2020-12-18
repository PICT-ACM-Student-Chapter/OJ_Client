import React from 'react';
import {Card, Col, Progress, Row, Skeleton, Tag, Typography} from "antd";
import {CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";

const SubmitComponent = (props) => {
    const {testCases, submissionLoading, passedTestCases} = props;

    const testCaseStatusColor = {
        'AC': 'green',
        'CTE': 'red',
        'RTE': 'red',
        'TLE': 'orange'
    }

    return (
        <div>
            <div style={{margin: '20px', overflow: 'scroll', height: '31vh'}}>
                {!testCases.length > 0 && !submissionLoading &&
                <div style={{textAlign: 'center', marginTop: '5%'}}><Typography.Title disabled level={4}>Please
                    submit the solution first</Typography.Title></div>}
                {submissionLoading && <Skeleton active/>}
                {testCases.length > 0 && !submissionLoading && <div>
                    <Progress success={{percent: Math.round(passedTestCases / testCases.length * 100, 2)}}
                              percent={75} strokeColor={'grey'} status={"active"}/>
                    <Typography.Link>{passedTestCases} of {testCases.length} Test Cases passed</Typography.Link>
                    <br/><br/>
                    <Row gutter={[32, 32]} justify="center" style={{justifyContent: "center"}}>
                        {testCases.map((tc, i) => (
                            <Col key={tc.id} span={8}>
                                <Card style={{height: '5.7rem'}}>
                                    <Skeleton loading={!tc.status || tc.status === 'IN_QUEUE'} round avatar
                                              paragraph={{rows: 0}} title={{width: '10rem'}} active>
                                        <Card.Meta title={`Testcase #${i + 1}`}
                                                   description={<Tag
                                                       color={testCaseStatusColor[tc.status]}>{tc.status}</Tag>}
                                                   avatar={<>
                                                       {tc.status === 'AC' && <Typography.Title level={2}
                                                                                                type={'success'}><CheckCircleOutlined/></Typography.Title>}
                                                       {(tc.status === 'CTE' || tc.status === 'RTE') &&
                                                       <Typography.Title level={2}
                                                                         type={'danger'}><CloseCircleOutlined/></Typography.Title>}
                                                       {tc.status === 'TLE' && <Typography.Title level={2}
                                                                                                 type={'warning'}><ClockCircleOutlined/></Typography.Title>}
                                                   </>
                                                   }
                                        />
                                    </Skeleton>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>}
            </div>
        </div>
    );
};

export default SubmitComponent;