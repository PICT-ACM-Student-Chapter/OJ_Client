import React from 'react'
import './App.less';
import Navbar from './components/Navbars/Navbar';
import Contests from './pages/Contests';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import ContestDetail from './pages/ContestDetailPage/contestdetail.page.'
import ContestInstructions from './pages/Instructions.page'

function App() {
    return (
        <div className="App" style={{backgroundColor: "black"}}>
            <Navbar/>
            <Login/>
            <Register/>
            <ContestInstructions/>
            <ContestDetail/>
            <Contests/>
        </div>
    );
}

export default App;
