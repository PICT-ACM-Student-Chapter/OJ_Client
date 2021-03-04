import React, {useContext} from 'react';
import {Link, matchPath, Route, Switch} from 'react-router-dom';
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
import Error403 from "./pages/403.page";
import Error404 from "./pages/404.page";
import Error500 from "./pages/500.page";
import {addRestrictions, removeRestrictions} from "./utils/restrictions";


const Routes = (props) => {

    const globalContext = useContext(GlobalContext)
    const location = useLocation()
    const [contestStatus, setContestStatus] = React.useState(null)

    const {apiError, apiErrorMsg} = globalContext;
    const match = matchPath(location.pathname, {
        path: "/contests/:contestId",
        exact: false
    })

    // eslint-disable-next-line
    let prevCont;
    React.useEffect(() => {
        if (globalContext.contests && match) {
            const contestId = match.params.contestId
            setContestStatus(checkContest(contestId))
        }
        if(match && globalContext.contests && checkContest(match.params.contestId) === 0) {
            addRestrictions(match.params.contestId)
            // eslint-disable-next-line
            prevCont = match.params.contestId
        }else
            removeRestrictions(prevCont)
        // eslint-disable-next-line
    }, [globalContext.contests, location.pathname, match])

    const checkContest = (contestId) => {
        /*
        Returns :
        0: Contest started
        1: Contest ended
        -1: Contest not started
        -2: Invalid contest
        -10: Restrictions fail
         */
        for (let c of globalContext.contests) {
            if(parseInt(localStorage.getItem(`${match.params.contestId}_warnings`)) >= 3)
                return -10
            if (c.contest_id?.id === contestId && new Date(c.contest_id.end_time) < new Date())
                return 1;
            if (c.contest_id?.id === contestId && new Date(c.contest_id.start_time) > new Date())
                return -1;
            if (c.contest_id?.id === contestId)
                return 0;
        }
        return -2;
    }

    return (
        <>
            {!apiError && <Switch>
                <Route exact path="/" component={Home}/>
                <ProLayout
                    title="PASC Online Judge"
                    logo={<Link to={'/contests'}><img style={{width: "auto"}}
                                                      src={"https://pict.acm.org/assets/images/navbar/Logo-name.png"} alt={"Logo"}/></Link>}
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
                    { match &&(contestStatus === 0 ? <>
                        <Route exact path="/contests/:contestId" component={ContestDetail}/>
                        <Route exact path="/contests/:contestId/:questionId" component={QuestionDetail}/>
                        <Route exact path="/contests/:contestId/:questionId/submissions" component={Submissions}/>
                    </> : <>
                        {contestStatus === 1 &&
                        <ContestOverPage contestId={match && match.params.contestId}/>}
                        {contestStatus === -10 &&
                        <Error403 contestId={match && match.params.contestId} message={"You are disqualified as you have attempted to exit the MCQ platform more that 3 times."}/>}
                        {contestStatus === -1 &&
                        <Error403 contestId={match && match.params.contestId}/>}
                        {contestStatus === -2 &&
                        <Error404 contestId={match && match.params.contestId}/>}
                    </>)}
                    <Route exact path="/contests" component={Contests}/>
                    <Route exact path="/leaderboard/:contestId" component={LeaderBoard}/>
                    {/*<Route  component={Error404}/>*/}
                </ProLayout>
            </Switch>}
            {apiError === 403 && <Error403 message={apiErrorMsg}/>}
            {apiError === 404 && <Error404 message={apiErrorMsg}/>}
            {apiError === 500 && <Error500 message={apiErrorMsg}/>}
        </>
    )

}

export default Routes
