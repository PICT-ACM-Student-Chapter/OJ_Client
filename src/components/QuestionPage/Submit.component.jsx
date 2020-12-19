import React from 'react';
import {Card, Col, Progress, Row, Skeleton, Tag, Typography} from "antd";
import {CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";


const SubmitComponent = (props) => {
    const {testCases, submissionLoading} = props;

    const testCaseStatusColor = {
        'AC': 'green',
        'CE': 'red',
        'WA': 'red',
        'RTE': 'red',
        'TLE': 'orange'
    }

    let passed = 0, totalJudged = 0;
    for (let i of props.testCases) {
        if (i.status !== 'IN_QUEUE') {
            if (i.status === 'AC')
                passed++;
            totalJudged++;
        }
    }

    return (
        <div>
            <div style={{margin: '20px', overflow: 'scroll', height: '31vh'}}>
                {!testCases.length > 0 && !submissionLoading &&
                <div style={{textAlign: 'center', marginTop: '5%'}}><Typography.Title disabled level={4}>Please
                    submit the solution first</Typography.Title></div>}
                {submissionLoading && <Skeleton active/>}
                {testCases.length > 0 && !submissionLoading && <div>
                    <Progress success={{percent: Math.round(passed / testCases.length * 100, 2)}}
                              percent={Math.round(totalJudged / testCases.length * 100)} strokeColor={'grey'}
                              status={totalJudged !== testCases.length && "active"}/>
                    <Typography.Link>{passed} of {testCases.length} Test Cases passed</Typography.Link>
                    <br/><br/>
                    <Row gutter={[32, 32]} justify="center" style={{justifyContent: "center"}}>
                        {testCases.map((tc, i) => (
                            <Col key={tc.test_case}>
                                <Card style={{height: '5.7rem', padding: '0 3rem 5rem 1rem'}}>
                                    <Skeleton loading={!tc.status || tc.status === 'IN_QUEUE'} round avatar
                                              paragraph={{rows: 0}} title={{width: '5rem'}} active>
                                        <Card.Meta title={`Testcase #${i + 1}`}
                                                   description={<Tag
                                                       color={testCaseStatusColor[tc.status]}>{tc.status}</Tag>}
                                                   avatar={<>
                                                       {tc.status === 'AC' && <Typography.Title level={2}
                                                                                                type={'success'}><CheckCircleOutlined/></Typography.Title>}
                                                       {(tc.status === 'CE' || tc.status === 'RTE' || tc.status === 'WA') &&
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