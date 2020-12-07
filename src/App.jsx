import React, {useEffect} from "react";
import "./App.less";
import Navbar from "./components/Navbars/Navbar";
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import ProLayout, {DefaultFooter} from '@ant-design/pro-layout';
import { ThemeProvider } from './context/ThemeContext'

function App() {
    useEffect(()=>{

    },[])
    const theme = 'dark'

  return (
      <ThemeProvider >
          <Router>
              <Routes/>
          </Router>
      </ThemeProvider>
  );
}

export default App;
