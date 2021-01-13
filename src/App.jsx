import React, {useContext, useEffect} from "react";
import "./App.less";
import Routes from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {ThemeProvider} from './context/ThemeContext'
import UserContext from "./context/User";
import jwt_decode from "jwt-decode";
import GlobalContext from "./context/GlobalContext";
import {useHistory} from "react-router";


function App() {

    const userContext = useContext(UserContext);
    const globalContext = useContext(GlobalContext);

    useEffect(() => {

        if (localStorage.getItem("token")) {
            try {
                let decoded = jwt_decode(localStorage.getItem("token"));
                userContext.loadUser(decoded.user_id);
            } catch (e){
                localStorage.removeItem("token")
                localStorage.removeItem("refresh-token")
                const location = window.location
                location.pathname = `/login?redirect=${location.pathname}`
            }
        }
        // eslint-disable-next-line
    }, []);

    useEffect(()=>{
        console.log('boom')
        if(userContext.user)
            globalContext.getContests()
        // eslint-disable-next-line
    }, [userContext.user])

    return (
        <ThemeProvider>
            <Router>
                <Routes/>
            </Router>
        </ThemeProvider>
    );
}

export default App;
