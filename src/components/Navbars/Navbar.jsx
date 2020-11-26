import {Col, Menu, Row} from 'antd'
import Layout, {Header} from 'antd/lib/layout/layout'
import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(props) {

    return (
        <>
            <Layout>
                <Header>
                    <Row>
                        <Col span={4}><h2 style={{color: "white"}}>OJ</h2></Col>
                        <Col span={16}></Col>
                        <Col span={4}>
                            <Menu mode="horizontal" style={{backgroundColor: "rgba(255, 255, 255, 0)"}} theme="dark">
                                <Menu.Item>Home</Menu.Item>
                                <Menu.Item><Link to='/login'>Login</Link></Menu.Item>
                                <Menu.Item><Link to='/register'>Register</Link></Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                </Header>
            </Layout>
        </>
    )
}

export default Navbar
