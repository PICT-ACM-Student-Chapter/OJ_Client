import React, {useContext, useState} from 'react';
import {matchPath, Route, Switch} from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Contests from './pages/Contests.page';
import ProLayout from '@ant-design/pro-layout';
import GlobalHeaderRight from "./components/Header/RightContent.component";
import QuestionDetail from "./pages/QuestionDetail/QuestionDetail.component";
import LeaderBoard from "./pages/Leaderboard/LeaderBoard.page";
import ContestDetail from "./pages/ContestDetailPage/ContestDetail.page"
import Submissions from "./pages/Submissions/Submissions.page";
import ContestOverPage from "./pages/ContestOver.page";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/index"
import GlobalContext from "./context/GlobalContext";
import {useLocation} from "react-router";
import axios from "axios";
import Error403 from "./pages/403.page";
import Error404 from "./pages/404.page";
import Error500 from "./pages/500.page";


const Routes = (props) => {

    const globalContext = useContext(GlobalContext)
    const location = useLocation()

    const {apiError, apiErrorMsg} = globalContext;

    // axios.interceptors.response.use((res)=>{
    //     setApiError(null)
    //     setApiErrorMsg('')
    //     return res;
    // }, function (error) {
    //     const statusCode = error.response ? error.response.status : null;
    //
    //     if(statusCode) {
    //         setApiError(statusCode)
    //         setApiErrorMsg(error?.response?.data?.detail)
    //     }
    //
    //     return Promise.reject(error);
    // })
    const match = matchPath(location.pathname, {
        path: "/contests/:contestId",
        exact: false
    })

    return (
        <>
            {!apiError && <Switch>
                <Route exact path="/" component={Home}/>
                <ProLayout
                    title="PASC OJ"
                    logo="https://pict.acm.org/radiance/img/PASC-W2.png"
                    layout="top"
                    fixedHeader="true"
                    rightContentRender={() => <GlobalHeaderRight/>}
                    footerRender={(props) => {
                        if (!matchPath(props.location.pathname, {
                            path: "/contests/:contestId/:questionId",
                            exact: true
                        }))
                            return <Footer/>
                    }}
                >
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    {globalContext.isContestLive ? <>
                        <Route exact path="/contests/:contestId" component={ContestDetail}/>
                        <Route exact path="/contests/:contestId/:questionId" component={QuestionDetail}/>
                        <Route exact path="/contests/:contestId/:questionId/submissions" component={Submissions}/>
                    </> : <>
                        {match && <ContestOverPage contestId={match.params.contestId}/>}
                    </>}
                    <Route exact path="/contests" component={Contests}/>
                    <Route exact path="/leaderboard/:contestId" component={LeaderBoard}/>
                    <Route exact path={'/lol'} component={ContestOverPage}/>
                    {/*<Route  component={Error404}/>*/}
                </ProLayout>
            </Switch>}
            {apiError === 403 && <Error403 message={apiErrorMsg} />}
            {apiError === 404 && <Error404 message={apiErrorMsg} />}
            {apiError === 500 && <Error500 message={apiErrorMsg} />}
        </>
    )

}

export default Routes
