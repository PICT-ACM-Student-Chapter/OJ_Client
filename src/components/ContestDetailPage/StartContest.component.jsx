import React from 'react';
import {Button, Card, Typography} from "antd";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import './ContestDetail.css'

const StartContestComponent = (props) => {
    return (
        <Card hoverable
              style={{padding: '0', cursor: 'default'}}
              title={<Typography.Title level={2}>Instructions:</Typography.Title>}
              actions={[
                  <Button style={{marginBottom: '1rem'}} onClick={props.startContest} type={'primary'} size={'large'}>Start
                      Contest</Button>
              ]}
        >
            <div id={'instruction-wrapper'}
                 style={{width: '100%', height: '60vh', overflowY: 'scroll', textAlign: 'left', fontSize: 'medium'}}>
                <ReactMarkdown
                    plugins={[gfm]} children={props.contest.instructions}/></div>
        </Card>
    );
};

export default StartContestComponent;