import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Contests from './pages/Contests.page';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import GlobalHeaderRight from "./components/Header/RightContent.component";
import { GithubOutlined } from '@ant-design/icons';

const defaultFooterDom = (
    <DefaultFooter
        copyright={`${new Date().getFullYear()} PICT ACM Student Chapter`}
        links={[
            {
                key: 'Website',
                title: 'Website',
                href: 'https://pict.acm.org',
                blankTarget: true,
            },
            {
                key: 'github',
                title: <GithubOutlined />,
                href: 'https://github.com/ant-design/ant-design-pro',
                blankTarget: true,
            },
            {
                key: 'LinkedIn',
                title: 'LinkedIn',
                href: 'https://ant.design',
                blankTarget: true,
            },
        ]}
    />
);

export class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <ProLayout
                    title="PASC OJ"
                    logo="https://pict.acm.org/radiance/img/PASC-W2.png"
                    layout="top"
                    fixedHeader="true"
                    rightContentRender={() => <GlobalHeaderRight/>}
                    footerRender = {() => defaultFooterDom}

                >
                    <Route path="/contests" component={Contests}/>
                </ProLayout>

            </Switch>
        )
    }
}

export default Routes
