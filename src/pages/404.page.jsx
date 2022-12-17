import React from 'react'
import {Button, Result} from "antd";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";

const Error404 = () => {
    return (
        <>
            <Helmet title={'403 - Not Authorized - PASC OJ'}/>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link to={'/contests'}><Button type="primary">Back Home</Button></Link>}
            />
        </>
    )
}

export default Error404
