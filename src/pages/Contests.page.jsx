import React, {useEffect, useState} from 'react'
import {Button, Card, Divider, List, Typography} from 'antd'
import Meta from 'antd/lib/card/Meta';
import ProSkeleton from '@ant-design/pro-skeleton';
import axios from 'axios';
import {parseDate} from "../utils/utils";
import {ClockCircleOutlined, EnterOutlined} from '@ant-design/icons'

const {Title} = Typography;


function Contests(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
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

    return (
        isLoading ?
            <ProSkeleton key={1}/>
            :
            <div key={2}>
                <Title>Contests</Title>
                <Divider/>

                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 3,
                        xl: 4,
                        xxl: 6,
                    }}
                    rowKey='id'
                    dataSource={data}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <Card
                                hoverable
                                style={{width: 240}}
                                cover={<img alt="example"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
                            >
                                <Meta title={item.contest_id.name}/>
                                <p><ClockCircleOutlined/>&nbsp;
                                    <strong>Starts:</strong> {parseDate(item.contest_id.start_time)}
                                </p>
                                <p><ClockCircleOutlined/>&nbsp;
                                    <strong>Ends:</strong> {parseDate(item.contest_id.end_time)}</p>
                                <Divider/>
                                <Button onClick={()=>props.history.push('/contests/'+item.contest_id.id)} icon={<EnterOutlined />} type="primary">Enter</Button>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
    )
}

export default Contests
