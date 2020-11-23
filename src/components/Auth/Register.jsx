import React from "react";
import { Form, Input, Button } from "antd";
import { Card } from "antd";
import { Link } from "react-router-dom";
// import svg from "../../undraw_Login_re_4vu2.svg";
import axios from "axios";
import svg from "../../signup.svg";
import "./css/LoginRegister.css";
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
  const onFinish = (values) => {
    console.log("Success:", values);
    if (values.password != values.confirm_password) {
      console.log("Passwords don't match");
    } else {
      const { username, password, first_name, last_name, email } = values;
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
          console.log(res);
          // localStorage.setItem("token", res.data.access);
          // localStorage.setItem("refresh-token", res.data.refresh);
          console.log("Registered Successfully");
          console.log("Redirect to Login Page");
        })
        .catch((e) => {
          console.log("Registration Failed");

          console.log(e);
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
          <img src={svg} width="100%" alt="login" />
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
              className="form-item"
              // label="Username"
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
              className="form-item"
              // label="Username"
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
                  // width: "150%",
                  height: "3em",
                  margin: 0,
                  maxWidth: "500px",
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
                  // width: "150%",
                  height: "3em",
                  margin: 0,
                  maxWidth: "500px",
                }}
              />
            </Form.Item>
            <Form.Item
              className="form-item"
              // label="Username"
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
                  // width: "150%",
                  height: "3em",
                  margin: 0,
                  maxWidth: "500px",
                }}
              />
            </Form.Item>
            {/* <Form.Item
              className="form-item"
              // label="Username"
              style={{
                width: "100%",
              }}
              name="phone number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input
                placeHolder="phone number"
                style={{
                  // width: "150%",
                  height: "3em",
                  margin: 0,
                  maxWidth: "500px",
                }}
              />
            </Form.Item> */}

            {/* <Form.Item
              className="form-item"
              // label="Username"
              style={{
                width: "100%",
              }}
              name="college"
              rules={[
                {
                  required: true,
                  message: "Please input your college!",
                },
              ]}
            >
              <Input
                placeHolder="college"
                style={{
                  // width: "150%",
                  height: "3em",
                  margin: 0,
                  maxWidth: "500px",
                }}
              />
            </Form.Item> */}
            <Form.Item
              className="form-item"
              // label="Password"
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
            <Form.Item
              className="form-item"
              // label="Password"
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
                  // width: "150%",
                }}
              />
            </Form.Item>

            <Form.Item
              {...tailLayout}
              className="form-item"
              style={{ padding: "0" }}
            >
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
                Sign-In
              </Button>
            </Form.Item>
          </Form>
          <p>
            Already have an account ?{" "}
            <a className="link" href="#">
              Login
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Register;
