import React from 'react';
import {Button, Card, Typography} from "antd";
import gfm from "remark-gfm";
import './ContestDetail.css'
import MarkdownMathJaxComponent from "../MarkdownMathJax.component";

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
                <MarkdownMathJaxComponent className="markdown"
                    plugins={[gfm]} children={props.contest.instructions}/></div>
        </Card>
    );
};

export default StartContestComponent;