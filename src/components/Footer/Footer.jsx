import React from "react";
import {DefaultFooter} from '@ant-design/pro-layout';
import {GithubOutlined} from "@ant-design/icons";



const Footer = () => {
    return (
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
                    title: <GithubOutlined/>,
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
};
export default Footer;
