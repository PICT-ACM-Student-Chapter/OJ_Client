import './App.less';
import Login from './components/Auth/Login';
import LeaderBoard from './components/LeaderBoard';
import Navbar from './components/Navbars/Navbar';
function App() {
  return (
    <div className="App" style={{backgroundColor:"black"}}>
      <Navbar></Navbar>
      <Login></Login>
    </div>
  );
}

export default App;
