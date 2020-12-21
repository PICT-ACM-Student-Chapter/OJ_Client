import React from 'react'
import {Card, Col, Row, Statistic, Tabs, Typography} from 'antd';
import {HourglassOutlined} from '@ant-design/icons'

const {TabPane} = Tabs;
const {Countdown} = Statistic;
const {Title} = Typography

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

const ContestDetail = () => {
    // let {contestId} = useParams();
    // const [isLoading, setIsLoading] = useState(false)


    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_BASE_URL}/contests/${contestId}`, {
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
    //         }
    //     }).then(
    //         (res) => {
    //             console.log(res.data)
    //         }
    //     )
    //         .then(() => {
    //             setIsLoading(false)
    //         })
    // }, [])
    return (

        <div>
            <Row>
                <Col span={12}>
                    <Title>Pratik Daigavane</Title>
                </Col>
                <Col>
                    <Card>
                        <Countdown prefix={<HourglassOutlined/>} title="Time Left" value={deadline}/>

                    </Card>

                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>

                    <Tabs size='large' type="card">
                        <TabPane tab="Questions" key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Instructions" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                    </Tabs>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Title level={2}>Leaderboard</Title>
                    {/*<Card title='Leaderboard'>*/}

                    {/*</Card>*/}

                </Col>
            </Row>
        </div>
    )
}


export default ContestDetail
