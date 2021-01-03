import React, {useContext, useEffect} from "react";
import "./App.less";
import Routes from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {ThemeProvider} from './context/ThemeContext'
import UserContext from "./context/User";
import jwt_decode from "jwt-decode";


function App() {

    const userContext = useContext(UserContext);

    useEffect(() => {

        if (localStorage.getItem("token")) {
            let decoded = jwt_decode(localStorage.getItem("token"));
            userContext.loadUser(decoded.user_id);
            console.log(userContext.user)

        }
        // eslint-disable-next-line
    }, []);

    return (
        <ThemeProvider>
            <Router>
                <Routes/>
            </Router>
        </ThemeProvider>
    );
}

export default App;
