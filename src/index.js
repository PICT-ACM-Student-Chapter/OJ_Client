import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {ThemeSwitcherProvider} from "react-css-theme-switcher";
import {UserProvider} from "./context/User";
import {GlobalProvider} from "./context/GlobalContext";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
    dsn: "https://355e47afbedf42fa993aa6f022d2d326@o504182.ingest.sentry.io/5590697",
    autoSessionTracking: true,
    integrations: [
        new Integrations.BrowserTracing(),
    ],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
});

const themes = {
    dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
    light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <GlobalProvider>
                <ThemeSwitcherProvider themeMap={themes} defaultTheme={localStorage.getItem('theme') || 'light'}>
                    <App/>
                </ThemeSwitcherProvider>
            </GlobalProvider>
        </UserProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
