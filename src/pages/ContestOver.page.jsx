import React from 'react';
import {Button, Image, Result, Space} from "antd";
import {BarChartOutlined} from "@ant-design/icons"
import './contestOver.page.css'
import {Link} from "react-router-dom";

function ContestOverPage(props) {

    return (
        <Result
            icon={<Image className={'contest-over-illustration'} src={'/time_over.svg'}/>}
            title="Contest Over"
            subTitle="Hope you enjoyed the contest. Good Day!"
            extra={<Space>
                <Link to={`/contests`}><Button size={'large'} type="primary">My Contests</Button></Link>
                <Link to={`/leaderboard/${props.contestId}`}><Button size={'large'} icon={
                    <BarChartOutlined/>}>Leaderboard</Button></Link>
            </Space>}
        />
    );
}

export default ContestOverPage;