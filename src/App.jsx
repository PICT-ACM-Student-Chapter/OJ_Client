import React from "react";
import "./App.less";
import Routes from "./routes";
import axios from 'axios';
import {BrowserRouter as Router} from "react-router-dom";
import {ThemeProvider} from './context/ThemeContext'
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import refreshAuthLogic from "./utils/utils";


function App() {
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
    return (
        <ThemeProvider>
            <Router>
                <Routes/>
            </Router>
        </ThemeProvider>
    );
}

export default App;
