import React, {useState} from "react";
import {Button, Card, Form, Input, message} from "antd";
import Feedback from "./Feedback";
// import svg from "../../undraw_Login_re_4vu2.svg";
import axios from "axios";
import svg from "../../assets/img/signup.svg";
import "./css/LoginRegister.css";

//for setting baseURL to backend
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

function Register() {
    const [form] = Form.useForm();
    const [feedback, setFeedback] = useState({
        message: "",
        type: 1,
        show: false,
    });
    const onFinish = (values) => {
        message
            .loading('Loading...')

        setFeedback({message: "Loading...", type: 1, show: true});
        console.log("Success:", values);
        if (values.password !== values.confirm_password) {
            setFeedback({message: "Passwords don't match", type: 3, show: true});
            console.log("Passwords don't match");
        } else {
            const {username, password, first_name, last_name, email} = values;
            const data = {
                username,
                password,
                first_name,
                last_name,
                email,
            };
            axios
                .post("/auth/register", data)
                .then((res) => {
                    form.resetFields();
                    console.log(res);
                    message.success('Registered Successfully!!')
                    setFeedback({
                        message: "Registered Successfully!!",
                        type: 2,
                        show: true,
                    });
                    console.log("Registered Successfully");
                    console.log("Redirect to Login Page");
                })
                .catch((e) => {
                    message.error("Registration Failed")
                    setFeedback({message: "Registration Failed!", type: 3, show: true});
                    console.log("Registration Failed");

                    console.log(e.response.data);
                });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
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
                    <h1>Pulzion21 OJ Register</h1>
                    <img src={svg} width="100%" alt="login"/>
                </div>
                <Card
                    title="Register For Pulzion 21"
                    style={{
                        width: "40%",
                        height: "fit-content",
                        padding: "2 em",
                        background: "#019183",
                        border: 0,
                        marginTop: "auto",
                        marginBottom: "auto",
                        maxWidth: "500px",
                        borderRadius:'30px',
                    }}
                    className="form-card"
                >
                    <Form
                        {...layout}
                        form={form}
                        name="basic"
                        initialValues={{
                            username: "",
                            password: "",
                            email: "",
                            first_name: "",
                            last_name: "",
                            confirm_password: "",
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style={{
                            width: "100%",

                            justifyContent: "center",
                            maxWidth: "500px",
                        }}
                    >
                        <Form.Item
                            className="form-item"
                            style={{
                                width: "100%",
                            }}
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input
                                placeHolder="username"
                                style={{
                                    height: "3em",
                                    margin: 0,
                                    maxWidth: "500px",
                                    borderRadius:"10px"
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            className="form-item"
                            style={{
                                width: "100%",
                            }}
                            name="first_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your First Name!",
                                },
                            ]}
                        >
                            <Input
                                placeHolder="first Name"
                                style={{
                                    height: "3em",
                                    margin: 0,
                                    maxWidth: "500px",
                                    borderRadius:"10px"
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            className="form-item"
                            style={{
                                width: "100%",
                            }}
                            name="last_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Last Name!",
                                },
                            ]}
                        >
                            <Input
                                placeHolder="last Name"
                                style={{
                                    height: "3em",
                                    margin: 0,
                                    maxWidth: "500px",
                                    borderRadius:"10px"
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            className="form-item"
                            style={{
                                width: "100%",
                            }}
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <Input
                                placeHolder="email"
                                style={{
                                    height: "3em",
                                    margin: 0,
                                    maxWidth: "500px",
                                    borderRadius:"10px"
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            className="form-item"
                            style={{
                                width: "100%",
                            }}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password
                                placeHolder="password"
                                style={{
                                    height: "3em",
                                    margin: 0,
                                    borderRadius:"10px"
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            className="form-item"
                            style={{
                                width: "100%",
                            }}
                            name="confirm_password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm your password!",
                                },
                            ]}
                        >
                            <Input.Password
                                placeHolder="confirm password"
                                style={{
                                    height: "3em",
                                    margin: 0,
                                    borderRadius:"10px"
                                }}
                            />
                        </Form.Item>

                        <Feedback feedback={feedback}/>
                        <Form.Item
                            {...tailLayout}
                            className="form-item"
                            style={{padding: "0"}}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    margin: "auto",
                                    marginLeft: "-50%",
                                    marginBottom: "0",
                                    width:'50%',
                                    borderRadius:"10px"
                                }}
                            >
                                Sign-In
                            </Button>
                        </Form.Item>
                    </Form>
                    <p>
                        Already have an account ?{" "}
                        <a className="link" href="/login">
                            Login
                        </a>
                    </p>
                </Card>
            </div>
        </div>
    );
}

export default Register;
