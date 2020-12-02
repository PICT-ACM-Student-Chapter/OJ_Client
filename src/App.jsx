import React from "react";
import "./App.less";
import Navbar from "./components/Navbars/Navbar";
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import ProLayout, {DefaultFooter} from '@ant-design/pro-layout';

function App() {
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
