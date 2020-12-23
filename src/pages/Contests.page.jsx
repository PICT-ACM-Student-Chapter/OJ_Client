import React, {useEffect, useState} from 'react'
import {Button, Card, Divider, Image, List, Row, Skeleton, Typography} from 'antd'
import Meta from 'antd/lib/card/Meta';
import axios from 'axios';
import {parseDate} from "../utils/utils";
import {ClockCircleOutlined, EnterOutlined} from '@ant-design/icons'

const {Title} = Typography;


function Contests(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([{}, {}, {}, {}])
    useEffect(() => {
        // Update the document title using the browser API
        axios.get(`${process.env.REACT_APP_BASE_URL}/contests`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(
            (res) => {
                setData(res.data.results)
            }
        ).then(() => {
            setIsLoading(false)

        })

    }, []);

    async function handleEnterContest(contest) {
        if (contest.status === 'REGISTERED')
            await axios.patch(`${process.env.REACT_APP_BASE_URL}/contests/${contest.contest_id.id}/start`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
        props.history.push('/contests/' + contest.contest_id.id)
    }

    return (
        <div key={2} style={{padding: '2% 4%'}}>
            <Title>Contests</Title>
            <Divider/>

            <List
                grid={{
                    gutter: 256,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 4,
                    xxl: 6,
                }}
                style={{
                    padding: '1% 2%'
                }}
                rowKey='id'
                dataSource={data}
                renderItem={item => (
                    <List.Item key={item.id}>
                        {/*TODO: Replace cover URL from API*/}
                        <Card
                            type="inner"
                            hoverable
                            style={{width: 280, minHeight: '170px'}}
                            cover={<Image alt="example"
                                          src={"https://unsplash.com/photos/14HyRO75p24/download?force=true?magic=" + new Date()}
                                          placeholder
                            />}
                        >
                            <Skeleton loading={isLoading}/>
                            {!isLoading && <><Meta
                                title={<Typography.Title level={4}>{item.contest_id.name}</Typography.Title>}
                            />
                                <br/>
                                <p><ClockCircleOutlined/>&nbsp;
                                    <strong>Starts:</strong> {parseDate(item.contest_id.start_time)}
                                </p>
                                <p><ClockCircleOutlined/>&nbsp;
                                    <strong>Ends:</strong> {parseDate(item.contest_id.end_time)}</p>
                                <Divider/>
                            </>}
                            <Row align={'center'}>
                                <Button
                                    disabled={isLoading  || ( !isLoading && (new Date(item.contest_id.start_time) > new Date() || new Date(item.contest_id.end_time) < new Date()))}
                                    onClick={() => handleEnterContest(item)}
                                    icon={<EnterOutlined/>} type="primary">Enter</Button>
                            </Row>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Contests
