<<<<<<< HEAD
import "./App.less";
import Login from "./components/Auth/Login";
import Navbar from "./components/Navbars/Navbar";
import Register from "./components/Auth/Register";

=======
import './App.less';
import Login from './components/Auth/Login';
import Navbar from './components/Navbars/Navbar';
import Contests from './pages/Contests';
>>>>>>> 6b8c23a588f871673adb2e778599e4e9d8cc498e
function App() {
  return (
    <div className="App" style={{ backgroundColor: "black" }}>
      <Navbar></Navbar>
<<<<<<< HEAD
      {/* <Login></Login> */}
      <Register></Register>
=======
      <Contests></Contests>
>>>>>>> 6b8c23a588f871673adb2e778599e4e9d8cc498e
    </div>
  );
}

export default App;
