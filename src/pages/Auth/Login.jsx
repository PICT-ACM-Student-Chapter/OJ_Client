import React, {useContext} from 'react';
import './css/login.css';
import {Button, Form, Input, message, Typography} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import axios from 'axios'
import * as queryString from "query-string";
import jwt_decode from "jwt-decode";
import UserContext from "../../context/User";
import GlobalContext from "../../context/GlobalContext";


const Login = (props) => {
    const userContext = useContext(UserContext);
    const globalContext = useContext(GlobalContext);

    const [errors, setErrors] = React.useState('')
    const [status, setStatus] = React.useState('')

    const onFinish = async values => {
        setStatus('validating')
        setErrors('')
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/jwt/create/`, values)
            setStatus('success')
            setErrors('')
            console.log(res.data.access)
            localStorage.setItem('token', res.data.access)
            localStorage.setItem('refresh-token', res.data.refresh)
            let decoded = jwt_decode(res.data.access);
            userContext.loadUser(decoded.user_id)

            message.success('Login Successful !!');

            globalContext.getContests(()=>{})

            const qs = queryString.parse(props.history.location.search);
            if (qs.redirect) {
                props.history.push(qs.redirect)
            } else
                props.history.push('/contests')

        } catch (e) {
            setStatus('error')
            setErrors('\nInvalid Email or Password!')
            message.error('Login Error !!');
        }
    };

    return (
        <div className='login-container'>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}

            >
                <Typography.Title align={'center'}>Login</Typography.Title>
                <br/><br/>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                    validateStatus={status}
                    hasFeedback={true}
                >
                    <Input size='large' prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"
                           errors={'dd'}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                    validateStatus={status}
                    hasFeedback={true}
                    help={errors}
                >
                    <Input
                        size='large'
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button size='large' type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <br/><br/>
                </Form.Item>
            </Form>
        </div>

    );
};

export default Login