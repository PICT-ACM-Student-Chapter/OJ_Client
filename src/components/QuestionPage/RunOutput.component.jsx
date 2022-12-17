import React from 'react'
import {Card, Skeleton, Space, Typography} from "antd";
import {b64Decode} from "../../utils/utils";

function isOutputError(output) {
    return output.status !== 'AC'
}

export default function RunOutputComponent(props) {
    const {output, outputLoading} = props;

    const statusColor = {
        'AC': 'success',
        'CTE': 'danger',
        'RTE': 'danger'
    }

    return <div style={{margin: '20px', overflow: 'scroll', height: '31vh'}}>
        {!output.status && !outputLoading &&
        <div style={{textAlign: 'center', marginTop: '5%'}}><Typography.Title disabled level={4}>Please run
            the code to see the output</Typography.Title></div>}
        {outputLoading && <Skeleton active/>}
        {output.status && !outputLoading && <div>
            <Space style={{fontSize: '1rem', marginBottom: '1rem'}}>
                { output.status === "AC" ?
                    <Typography.Text
                        type={statusColor[output.status]}>Execution Success &nbsp;&nbsp;</Typography.Text>
                    :
                    <Typography.Text
                        type={statusColor[output.status] || 'warning'}>{output.status || ''}&nbsp;&nbsp;</Typography.Text>
                }

                <Typography.Text
                    type={'secondary'}>Runtime: {`${output.exec_time || '--'} s`}</Typography.Text>
            </Space>
            <Card style={{minHeight: '12rem'}}>
                {!isOutputError(output) && <pre>{b64Decode(output.stdout)}</pre>}
                {isOutputError(output) && <pre style={{color: '#a61d24'}}>{b64Decode(output.stderr)}</pre>}
            </Card>
        </div>}
    </div>
}