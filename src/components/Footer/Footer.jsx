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
                    href: 'https://github.com/PICT-ACM-Student-Chapter',
                    blankTarget: true,
                },
                {
                    key: 'LinkedIn',
                    title: 'LinkedIn',
                    href: 'https://www.linkedin.com/company/pict-acm-student-chapter/',
                    blankTarget: true,
                },
            ]}
        />
    );
};
export default Footer;
