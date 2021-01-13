import {Avatar, Dropdown, Menu, Space} from 'antd';
import {LogoutOutlined, RetweetOutlined} from '@ant-design/icons';
import React, {useContext, useEffect} from "react";
import {useThemeSwitcher} from 'react-css-theme-switcher';
import ThemeContext from "../../context/ThemeContext";
import {useHistory} from "react-router";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import axios from "axios";
import {refreshAuthLogic} from "../../utils/utils";
import UserContext from "../../context/User";
import Gravatar from 'react-gravatar'

const GlobalHeaderRight = (props) => {
        const {switcher, themes} = useThemeSwitcher();
        const theme = useContext(ThemeContext)
        const userContext = useContext(UserContext)
        const history = useHistory()

        useEffect(() => {
                const pathLogin = history.location.pathname
                if (pathLogin === '/') {
                    console.log(pathLogin, "--------Line 21 header---------")

                } else {
                    axios.post(process.env.REACT_APP_BASE_URL + '/auth/jwt/verify', {"token": (localStorage.getItem('refresh-token'))})
                        .catch(_ => {
                            userContext.dispose()
                            const path = history.location.pathname
                            if (path !== "/login")
                                history.push(`/login?redirect=${path}`)

                            return
                        })
                }

                createAuthRefreshInterceptor(axios, (failedRequest) => {
                    //If refresh-token null
                    if (localStorage.getItem('refresh-token') === null) {
                        const path = history.location.pathname
                        history.push(`/login?redirect=${path}`)
                        return
                    } else {
                        axios.post(process.env.REACT_APP_BASE_URL + '/auth/jwt/verify', {"token": (localStorage.getItem('refresh-token'))})
                            .then(() => {

                            })
                            .catch(err => {
                                localStorage.setItem('refresh-token', null)
                                localStorage.setItem('token', null)
                                const path = history.location.pathname
                                history.push(`/login?redirect=${path}`)

                                return
                            })
                    }


                    return refreshAuthLogic(failedRequest)

                })

                // eslint-disable-next-line
            }, []
        )

        const logout = () => {
            userContext.dispose()
            history.push('/login')


        }


        const toggleDarkMode = () => {
            if (theme.theme === 'light') {
                //make it dark
                theme.setTheme('dark')
                switcher({theme: themes.dark})
            } else {
                //make it light
                theme.setTheme('light')
                switcher({theme: themes.light})
            }
        };
        const path = history.location.pathname

        if (path === '/' || path === '/login')
            return <div/>
        else
            return (
                <div>
                    <Dropdown overlay={() => (
                        <Menu selectedKeys={[]}>
                            <Menu.Item key="theme" onClick={toggleDarkMode}>
                                <RetweetOutlined/>
                                Toggle Theme
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item key="logout" onClick={logout}>
                                <LogoutOutlined/>
                                Logout
                            </Menu.Item>
                        </Menu>
                    )}>
                        <Space>

                            <Avatar size='medium' style={{backgroundColor: '#87d068', cursor: 'pointer'}}
                                    icon={<Gravatar email={userContext.user && userContext.user.email}/>}/>
                            <span style={{color: 'white'}}>{userContext.user && userContext.user.username}</span>
                        </Space>
                    </Dropdown></div>
            );
    }
;

export default GlobalHeaderRight
