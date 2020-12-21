import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Contests from './pages/Contests.page';
import ProLayout from '@ant-design/pro-layout';
import GlobalHeaderRight from "./components/Header/RightContent.component";
import QuestionDetail from "./pages/QuestionDetail/QuestionDetail.component";
import LeaderBoard from "./pages/Leaderboard/LeaderBoard.page";
import ConstestDetail from "./pages/ContestDetailPage/ContestDetail.page"
import Submissions from "./pages/Submissions/Submissions.page";
import Footer from "./components/Footer/Footer";



const Routes = ()=> {
        return (
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <ProLayout
                    title="PASC OJ"
                    logo="https://pict.acm.org/radiance/img/PASC-W2.png"
                    layout="top"
                    fixedHeader="true"
                    rightContentRender={() => <GlobalHeaderRight/>}
                    footerRender={() => <Footer/>}
                >
                    <Route exact path="/contests/:contestId/:questionId" component={QuestionDetail}/>
                    <Route exact path="/contests/:contestId/:questionId/submissions" component={Submissions}/>
                    <Route exact path="/contests/:contestId" component={ConstestDetail}/>
                    <Route exact path="/contests" component={Contests}/>
                    <Route path="/leaderboard/:contestId" component={LeaderBoard}/>
                </ProLayout>

            </Switch>
        )

}

export default Routes
