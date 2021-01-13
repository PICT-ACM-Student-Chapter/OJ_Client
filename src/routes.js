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


const Routes = (props) => {

    const globalContext = useContext(GlobalContext)
    const location = useLocation()
    const [contestStatus, setContestStatus] = React.useState(null)

    const {apiError, apiErrorMsg} = globalContext;
    const match = matchPath(location.pathname, {
        path: "/contests/:contestId",
        exact: false
    })

    React.useEffect(() => {
        if (globalContext.contests && match) {
            const contestId = match.params.contestId
            setContestStatus(checkContest(contestId))
        }
        // eslint-disable-next-line
    }, [globalContext.contests, location.pathname, match])

    const checkContest = (contestId) => {
        /*
        Returns :
        0: Contest started
        1: Contest ended
        -1: Contest not started
        -2: Invalid contest
         */
        for (let c of globalContext.contests) {
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
                                                      src={"https://pict.acm.org/assets/images/navbar/Logo-name.png"}/></Link>}
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
                    {contestStatus === 0 ? <>
                        <Route exact path="/contests/:contestId" component={ContestDetail}/>
                        <Route exact path="/contests/:contestId/:questionId" component={QuestionDetail}/>
                        <Route exact path="/contests/:contestId/:questionId/submissions" component={Submissions}/>
                    </> : <>
                        {contestStatus === 1 &&
                        <ContestOverPage contestId={match.params.contestId}/>}
                        {contestStatus === -1 &&
                        <Error403 contestId={match.params.contestId}/>}
                        {contestStatus === -2 &&
                        <Error404 contestId={match.params.contestId}/>}
                    </>}
                    <Route exact path="/contests" component={Contests}/>
                    <Route exact path="/leaderboard/:contestId" component={LeaderBoard}/>
                    <Route exact path={'/lol'} component={ContestOverPage}/>
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
