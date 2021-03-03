import React from 'react';
import {Button, Result} from "antd";
import {Helmet} from "react-helmet";

function Error500(props) {
    return (
        <>
            <Helmet title={'403 - Not Authorized - PASC OJ'}/>
            <Result
                status="500"
                title="500"
                subTitle={'Sorry, something went wrong.'}
                extra={<Button type="primary">Back Home</Button>}
            />
        </>
    );
}

export default Error500;