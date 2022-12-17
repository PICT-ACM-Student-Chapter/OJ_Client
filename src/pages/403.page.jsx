import React from 'react';
import {Button, Result} from "antd";
import {Helmet} from "react-helmet";

function Error403(props) {
    return (
        <>
            <Helmet title={'403 - Not Authorized - PASC OJ'}/>
            <Result
                status="403"
                title="403"
                subTitle={<>Sorry, you are not authorized to access this page.<br/>
                    {props.message}</>}
                extra={<Button type="primary">Back Home</Button>}
            />
        </>
    );
}

export default Error403;