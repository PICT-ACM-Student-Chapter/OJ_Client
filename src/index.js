import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {ThemeSwitcherProvider} from "react-css-theme-switcher";

const themes = {
    dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
    light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

console.log(process.env);
ReactDOM.render(
    <React.StrictMode>
        <ThemeSwitcherProvider themeMap={themes} defaultTheme="light">
            <App/>
        </ThemeSwitcherProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
