import { Row , Col, Menu } from 'antd'
import Layout ,{Header}from 'antd/lib/layout/layout'
import React from 'react'
function Navbar(props) {

    return (
        <>
            <Layout>
                <Header>
                    <Row >
                        <Col span={4}><h2 style={{color:"white"}}>OJ</h2></Col>
                        <Col span={16}></Col>
                        <Col span={4}>
                            <Menu mode="horizontal" style={{backgroundColor:"rgba(255, 255, 255, 0)"}} theme="dark">
                                {/* <Menu.Item>props.content</Menu.Item>
                                <Menu.Item>Login</Menu.Item> */}
                                {props.contents.map(content=>( <Menu.Item>{content.name}</Menu.Item>) )}
                            </Menu>
                        </Col>
                    </Row>
                </Header>
            </Layout>
        </>
    )
}

export default Navbar;
