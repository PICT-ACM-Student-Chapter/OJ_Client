import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
// import svg from "../../undraw_Login_re_4vu2.svg";
import { Card } from "antd";
import { Link } from "react-router-dom";
import svg from "../../login.svg";

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
  const onFinish = (values) => {
    console.log("Success:", values);
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
          <h1>Pulzion21 OJ Login</h1>
          <img src={svg} width="100%" alt="login" />
        </div>
        <Card
          title="Login For Pulzion 21"
          style={{
            width: "40%",
            height: "fit-content",
            padding: "2 em",
            background: "#019183",
            border: 0,
            marginTop: "auto",
            marginBottom: "auto",

            maxWidth: "500px",
          }}
          className="form-card"
        >
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
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
              // label="Username"
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
                  // width: "150%",
                  height: "3em",
                  margin: 0,
                  maxWidth: "500px",
                }}
              />
            </Form.Item>

            <Form.Item
              // label="Password"
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
                  // width: "150%",
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

            <Form.Item {...tailLayout} style={{ padding: "0" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  margin: "auto",
                  // width: "100%",
                  marginLeft: "-50%",
                  marginBottom: "0",
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          <p>
            Don't have an account ?{" "}
            <a href="#" className="link">
              Register
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Login;
