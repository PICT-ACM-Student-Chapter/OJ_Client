import React from 'react'
import './App.less';
import Navbar from './components/Navbars/Navbar';
import Routes from './routes';
import { BrowserRouter as Router} from 'react-router-dom';

function App() {
    return (
        <div className="App" style={{ backgroundColor: "black" }}>
            <Router>
                <Navbar />
                <Routes></Routes>
            </Router>

        </div>
    );
}

export default App;
