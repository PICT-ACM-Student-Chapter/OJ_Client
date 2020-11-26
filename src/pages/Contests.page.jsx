import React from 'react'
import {Card, List, Row} from 'antd'
import Meta from 'antd/lib/card/Meta';

function Contests() {
    const cardStyle = {
        margin: '1.4em',
        backgroundColor: '#090909',
        border: '0px',
    }
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
        <div>
            <br></br>
            <Card style={{
                margin: '1em 2em 1em 2em'
            }}>
                <Row>
                    <h1 style={{marginLeft: '1em'}}>Contests</h1>

                </Row>
                <hr></hr>
                <List
                    grid={{gutter: 16, column: 5}}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                hoverable
                                cover={<img src="GSOC.png" style={{
                                    maxWidth: '150px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    paddingTop: '1em'
                                }}></img>}
                                style={cardStyle}>
                                <Meta title={<h1>{item.title}</h1>}></Meta>
                                <hr></hr>
                                <h3>Contest at 14th Feb based in Python</h3>
                            </Card>
                        </List.Item>
                    )}
                />
            </Card>


        </div>
    )
}

export default Contests
