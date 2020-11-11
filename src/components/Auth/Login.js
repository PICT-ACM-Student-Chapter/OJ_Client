import { Col , Row} from 'antd'
import React from 'react'

function Login() {
    return (
        <div style={{backgroundColor:"#121212"}}>
            <Row style={{height:"94vh"}}>
                <Col span={2} />
                <Col span = {10}><h2>Heading</h2></Col>
                <Col span = {10}><h2>Card</h2></Col>
                <Col span={2} />
            </Row>
        </div>
    )
}

export default Login
