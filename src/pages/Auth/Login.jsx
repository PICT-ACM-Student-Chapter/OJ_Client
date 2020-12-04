import React, {useState} from "react";
import Feedback from "./Feedback";
import {Button, Card, Checkbox, Form, Input, message} from "antd";
import axios from "axios";
import svg from "../../assets/img/login.svg";
import "./css/LoginRegister.css";
import {Link} from "react-router-dom";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {useHistory} from "react-router";

import queryString from "query-string";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

function Login() {
    const history = useHistory();
    const [form] = Form.useForm();
    const [feedback, setFeedback] = useState({
        message: "",
        type: 1,
        show: false,
    });

    //called on unsuccessful submit
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    //called on successfull submit
    const onFinish = (values) => {

        form.resetFields();
        setFeedback({message: "Loading...", type: 1, show: true});

        if (localStorage.getItem("token")) {
            setFeedback({message: "Already Logged In", type: 1, show: true});
        } else {
            const {username, password} = values;
            axios
                .post("/auth/login", {username, password})
                .then((res) => {
                    localStorage.setItem("token", res.data.access);
                    localStorage.setItem("refresh-token", res.data.refresh);
                    console.log("Logged In Successfully");
                    setFeedback({
                        message: "Successfully Logged In!!",
                        type: 2,
                        show: true,
                    });
                })
                .then(() => {
                    const qs = queryString.parse(history.location.search);
                    if(qs.redirect){
                        history.push(qs.redirect)
                    }else
                    history.push('/contests')
                })
                .catch((e) => {
                    // setFeedback({ message: "Login Failed!", type: 3, show: true });
                    setFeedback({message: e.response.data.detail, type: 3, show: true});

                    values = {
                        username: "",
                        password: "",
                    };
                    console.log("Login Failed");

                    console.log(e.response.data);
                });
        }
    };

    return (
        <div className="login-register-page">
            <div
                className="login-register"
                style={{
                    backgroundColor: "#141414",
                    margin: "auto",
                }}
            >
                <div className="svg-card ">
                    <h1>PASC OJ</h1>
                    <img src={svg} width="100%" alt="login"/>
                </div>
                <Card
                    title={<h1>Login</h1>}
                    style={{
                        width: "40%",
                        height: "fit-content",
                        padding: "2 em",
                        background: "#019183",
                        border: 0,
                        marginTop: "auto",
                        marginBottom: "auto",
                        maxWidth: "500px",
                        borderRadius: '30px',
                    }}
                    className="form-card"
                >
                    <Form
                        {...layout}
                        form={form}
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style={{
                            width: "100%",
                            justifyContent: "center",
                            maxWidth: "500px",
                        }}
                        initialValues={{remember: true, username: "", password: ""}}
                    >
                        <Form.Item
                            // label="Username"
                            className="form-item"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input
                                placeHolder="Username"
                                prefix={<UserOutlined/>}
                                style={{
                                    width: "150%",
                                    height: "3em",
                                    margin: 0,
                                    maxWidth: "500px",
                                    borderRadius: "10px"
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            // label="Password"
                            className="form-item"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password
                                placeHolder="Password"
                                prefix={<LockOutlined/>}
                                style={{
                                    height: "3em",
                                    margin: 0,
                                    width: "150%",
                                    borderRadius: "10px"
                                }}
                            />
                        </Form.Item>

                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox
                                style={{
                                    marginLeft: "-50%",
                                }}
                            >
                                Remember me
                            </Checkbox>
                        </Form.Item>
                        <Feedback feedback={feedback}/>
                        <Form.Item
                            className="form-item"
                            {...tailLayout}
                            style={{padding: "0"}}
                        >
                            <Button
                                size="large"
                                type="primary"
                                htmlType="submit"
                                style={{
                                    margin: "auto",
                                    width: "50%",
                                    marginLeft: "-50%",
                                    marginBottom: "0",
                                    borderRadius: "10px"
                                }}
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <p>
                        Don't have an account ?{" "}
                        <Link to="/register" style={{color: "white"}}>Register</Link>
                    </p>
                </Card>
            </div>
        </div>
    )
}

export default Login
