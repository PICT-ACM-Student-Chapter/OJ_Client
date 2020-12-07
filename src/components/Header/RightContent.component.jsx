import {Avatar, Badge, Dropdown, Menu, Space} from 'antd';
import {BellOutlined, LogoutOutlined, RetweetOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import React, {useContext} from "react";
import { useThemeSwitcher } from 'react-css-theme-switcher';
import ThemeContext from "../../context/ThemeContext";



const GlobalHeaderRight = (props) => {
    const { switcher, themes, currentTheme, status } = useThemeSwitcher();
    const theme = useContext(ThemeContext)


    const toggleDarkMode = () => {
        if(theme.theme === 'light'){
            //make it dark
            theme.setTheme('dark')
            switcher({theme: themes.dark})
        }else{
            //make it light
            theme.setTheme('light')
            switcher({theme: themes.light})
        }
    };

    return (
        <div>
            <Dropdown  overlay={()=>(
                <Menu selectedKeys={[]}>
                    <Menu.Item key="center">
                        <UserOutlined/>
                        Profile
                    </Menu.Item>
                    <Menu.Item key="theme" onClick={toggleDarkMode}>
                        <RetweetOutlined />
                        Toggle Theme
                    </Menu.Item>
                    <Menu.Item key="settings">
                        <SettingOutlined/>
                        Account Settings
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item key="logout">
                        <LogoutOutlined/>
                        Logout
                    </Menu.Item>
                </Menu>
            )}>
                <Space>

                    <Avatar size='medium' style={{backgroundColor: '#87d068',cursor: 'pointer'}} icon={<UserOutlined/>}/>
                    <span style={{color: 'white'}}>Admin</span>
                </Space>
            </Dropdown></div>
    );
};

export default GlobalHeaderRight
