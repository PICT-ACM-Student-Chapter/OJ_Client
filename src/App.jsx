import React from "react";
import "./App.less";
import Routes from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {ThemeProvider} from './context/ThemeContext'


function App() {

    return (
        <ThemeProvider>
            <Router>
                <Routes/>
            </Router>
        </ThemeProvider>
    );
}

export default App;
