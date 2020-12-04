import React from "react";
import "./App.less";
import Routes from "./routes";
import axios from 'axios';

import {BrowserRouter as Router} from "react-router-dom";
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import refreshAuthLogic from "./utils/utils";


function App() {

    createAuthRefreshInterceptor(axios, refreshAuthLogic);

    return (
        <div className="App">
            <Router>
                {/* <Navbar /> */}

                <Routes/>
            </Router>
        </div>
    );
}

export default App;
