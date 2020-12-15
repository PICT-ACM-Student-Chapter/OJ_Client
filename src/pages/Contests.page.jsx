import React, {useEffect, useState} from 'react'
import {Button, Card, Divider, List, Typography} from 'antd'
import Meta from 'antd/lib/card/Meta';
import ProSkeleton from '@ant-design/pro-skeleton';
import axios from 'axios';

const {Title} = Typography;

function Contests() {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        // Update the document title using the browser API
        axios.get(`${process.env.REACT_APP_BASE_URL}/contests`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, []);
    const data = [
        {
            title: 'GSOC',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
    ];
    return (
        isLoading ?
            <ProSkeleton/>
            :
            <div>
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
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                hoverable
                                style={{width: 240}}
                                cover={<img alt="example"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
                            >
                                <Meta title={item.title}/>
                                <Divider/>
                                <Button type="primary">Start Now</Button>
                            </Card>
                        </List.Item>
                    )}
                />


            </div>
    )
}

export default Contests
