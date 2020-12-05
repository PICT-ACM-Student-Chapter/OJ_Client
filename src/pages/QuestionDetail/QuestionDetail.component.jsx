import React, {useEffect} from 'react'
import {useParams} from "react-router";
import {Space, Row, Col, Card, Select, Spin} from "antd";
import Editor from "@monaco-editor/react";
const { Option } = Select;

const question = {
    name: 'Level Nodes'
}

function QuestionDetail (){
    const {contestId, questionId} = useParams()

    useEffect(() =>{
        //check if contestID and questionId are valid and user is authorised
    },[])

    return(
        <Row>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Card></Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Space>
                    <Select style={{ width: 120 }} size='large' defaultValue="lucy">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                            Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </Space>
                <Editor 
                    loading={<Spin size={'large'}/>}
                    height="90vh" 
                    language="javascript" 
                />
                <Space>
                    <Select style={{ width: 120 }} size='large' defaultValue="lucy">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                            Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </Space>
            </Col>
        </Row>

    )
}
export default QuestionDetail